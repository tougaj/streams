"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const common_1 = require("../common");
const router = express_1.default.Router();
const STREAM_LIST_ADDRESS = process.env.STREAM_LIST_ADDRESS;
if (!STREAM_LIST_ADDRESS) {
    console.error('Помилка: не задано адресу списку стрімів');
    process.exit(1);
}
router.get('/streamList', (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // res.setHeader('Cache-control', isProduction ? 'private, max-age=300' : 'no-cache, must-revalidate');
    res.setHeader('Cache-control', 'no-cache, must-revalidate');
    const response = yield (0, node_fetch_1.default)(STREAM_LIST_ADDRESS, {
        agent: common_1.proxyAgent,
    });
    if (!response.ok) {
        throw (0, http_errors_1.default)(response.status, yield response.text());
    }
    const list = yield response.json();
    res.json(list);
})));
exports.default = router;
