"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
// import createError from 'http-errors';
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const rfs = __importStar(require("rotating-file-stream"));
const common_1 = require("./common");
const streamList_1 = __importDefault(require("./routers/streamList"));
process.on('SIGINT', function () {
    console.log('Exiting...');
    process.exit(0);
});
morgan_1.default
    .token('remote-ip', function (req, res) {
    var _a;
    return ((_a = req.headers['x-real-ip']) === null || _a === void 0 ? void 0 : _a.toString()) || req.socket.remoteAddress;
})
    .token('remote-email', function (req, res) {
    var _a;
    return ((_a = req.headers['c-user-email']) === null || _a === void 0 ? void 0 : _a.toString()) || 'n/a';
});
(0, common_1.environmentInit)();
// const asyncHandler = require('express-async-handler');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, helmet_1.default)());
const accessLogStream = common_1.isProduction
    ? rfs.createStream('access.log', {
        interval: '1d',
        path: path_1.default.join(__dirname, '../log'),
    })
    : undefined;
if (common_1.isProduction) {
    app.use((0, morgan_1.default)('dev', {
        skip: (req, res) => res.statusCode < 400,
    }));
    app.use((0, morgan_1.default)(':remote-ip - :remote-user :remote-email [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: accessLogStream }));
}
else {
    app.use((0, morgan_1.default)('dev'));
}
// Express only serves static assets in production
// if (isProduction) {
app.use('/', express_1.default.static(path_1.default.join(__dirname, '../../client/build'), {
    setHeaders: function setHeaders(res, path, stat) {
        if (!path.endsWith('.html'))
            return;
        res.set('Cache-control', 'no-cache, must-revalidate');
        const CSP = [
            "default-src 'self' blob: *.google-analytics.com",
            "connect-src 'self' http: *.google-analytics.com 132.226.223.144",
            // "base-uri 'self'",
            'block-all-mixed-content',
            "font-src 'self' https: data:",
            "form-action 'self'",
            "frame-ancestors 'self'",
            "img-src 'self' data: *",
            "object-src 'none'",
            // "script-src 'self' 'unsafe-inline' blob: *.youtube.com *.googletagmanager.com",
            "script-src 'self' 'unsafe-inline' blob: cdn.jsdelivr.net *.googletagmanager.com",
            // "script-src-attr 'none'",
            "style-src 'self' https: 'unsafe-inline'",
            // 'upgrade-insecure-requests',
        ].join(';');
        //https://developer.mozilla.org/ru/docs/Web/HTTP/CSP
        res.set('Content-Security-Policy', CSP);
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy
        res.set('Cross-Origin-Embedder-Policy', 'unsafe-none');
        // res.set('Access-Control-Allow-Headers', '*');
        // res.set('Access-Control-Allow-Methods', '*');
        // res.set('Access-Control-Allow-Origin', '*');
        // res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    },
}));
// }
app.use('/api', streamList_1.default);
app.use((error, req, res, next) => {
    // console.log('Error status: ', error.status);
    // console.log('Message: ', error.message);
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.status).send(error.message);
});
app.listen(PORT, () => {
    console.log(`Find the ${common_1.isProduction ? 'Production' : 'Development'} server at: http://localhost:${PORT}/`);
});
