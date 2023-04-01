import express from 'express';
import { IStreamServerParams } from '../common';

const router = express.Router();
const STREAM_SERVER_ADDRESS = process.env.STREAM_SERVER_ADDRESS;
if (!STREAM_SERVER_ADDRESS) {
	console.error('❗Помилка: не задано адресу сервера трансляцій');
}
const HLS_PORT = process.env.HLS_PORT;
const WEB_RTC_PORT = process.env.WEB_RTC_PORT;
if (!(HLS_PORT || WEB_RTC_PORT)) {
	console.error('❗Помилка: не задано бодай один з портів трансляції');
}

router.get('/params', (req, res, next) => {
	// if (!STREAM_SERVER_ADDRESS) {
	// 	throw createError(500, 'Не задано адресу сервера трансляцій');
	// }

	res.json({
		address: STREAM_SERVER_ADDRESS || null,
		hlsPort: HLS_PORT || null,
		webRtcPort: WEB_RTC_PORT || null,
	} as IStreamServerParams);
});

export default router;
