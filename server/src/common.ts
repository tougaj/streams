import * as dotenv from 'dotenv';
const HttpsProxyAgent = require('https-proxy-agent');

dotenv.config();

export const isProduction = process.env.NODE_ENV === 'production';
export const SOLR_SERVER = process.env.SOLR_SERVER;
const PROXY_ADDRESS = process.env.PROXY;

export interface IStreamServerParams {
	address: string | null;
	hlsPort: number | null;
	webRtcPort: number | null;
}

export interface IMyError extends Error {
	status: number;
	message: string;
}

export const environmentInit = () => void 0;

export const proxyAgent = PROXY_ADDRESS ? new HttpsProxyAgent(PROXY_ADDRESS) : undefined;
