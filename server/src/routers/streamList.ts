import express from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import fetch from 'node-fetch';
import { proxyAgent } from '../common';

const router = express.Router();

router.get(
	'/streamList',
	asyncHandler(async (req, res, next) => {
		// res.setHeader('Cache-control', isProduction ? 'private, max-age=300' : 'no-cache, must-revalidate');
		res.setHeader('Cache-control', 'no-cache, must-revalidate');

		const response = await fetch('http://132.226.223.144:9997/v1/paths/list', {
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
