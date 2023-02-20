import express from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import fetch from 'node-fetch';
import { proxyAgent } from '../common';

const router = express.Router();
const STREAM_LIST_ADDRESS = process.env.STREAM_LIST_ADDRESS || '"http://127.0.0.1:8080/v1/paths/list';

router.get(
	'/streamList',
	asyncHandler(async (req, res, next) => {
		// res.setHeader('Cache-control', isProduction ? 'private, max-age=300' : 'no-cache, must-revalidate');
		res.setHeader('Cache-control', 'no-cache, must-revalidate');

		const response = await fetch(STREAM_LIST_ADDRESS, {
			agent: proxyAgent,
		});

		if (!response.ok) {
			throw createError(response.status, await response.text());
		}

		const list = await response.json();
		res.json(list);
	})
);

export default router;
