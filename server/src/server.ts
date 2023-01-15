import express from 'express';
import helmet from 'helmet';
// import createError from 'http-errors';
import morgan from 'morgan';
import path from 'path';
import * as rfs from 'rotating-file-stream';
import { environmentInit, IMyError, isProduction } from './common';
import streamList from './routers/streamList';

process.on('SIGINT', function () {
	console.log('Exiting...');
	process.exit(0);
});

morgan
	.token('remote-ip', function (req, res) {
		return req.headers['x-real-ip']?.toString() || req.socket.remoteAddress;
	})
	.token('remote-email', function (req, res) {
		return req.headers['c-user-email']?.toString() || 'n/a';
	});

environmentInit();

// const asyncHandler = require('express-async-handler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());

const accessLogStream = isProduction
	? rfs.createStream('access.log', {
			interval: '1d', // rotate daily
			path: path.join(__dirname, '../log'),
	  })
	: undefined;
if (isProduction) {
	app.use(
		morgan('dev', {
			skip: (req, res) => res.statusCode < 400,
		})
	);
	app.use(
		morgan(
			':remote-ip - :remote-user :remote-email [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
			{ stream: accessLogStream }
		)
	);
} else {
	app.use(morgan('dev'));
}

// Express only serves static assets in production
// if (isProduction) {
app.use(
	'/',
	express.static(path.join(__dirname, '../../client/build'), {
		setHeaders: function setHeaders(res, path, stat) {
			if (!path.endsWith('.html')) return;

			res.set('Cache-control', 'no-cache, must-revalidate');

			const CSP = [
				"default-src 'self' 132.226.223.144:8888 *.google-analytics.com",
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
	})
);
// }

app.use('/api', streamList);

app.use((error: IMyError, req: any, res: any, next: any) => {
	// console.log('Error status: ', error.status);
	// console.log('Message: ', error.message);
	if (res.headersSent) {
		return next(error);
	}

	res.status(error.status).send(error.message);
});

app.listen(PORT, () => {
	console.log(`Find the ${isProduction ? 'Production' : 'Development'} server at: http://localhost:${PORT}/`);
});
