export type TStringWithUndefined = string | undefined;
export type TNumberWithUndefined = number | undefined;

export interface IErrorResponse {
	error: string;
}

export const DEFAULTS = {
	pageTitle: 'Streams',
	fluid: true,
	streamServer: {
		address: 'http://132.226.223.144',
		hlsPort: 8888,
		webRtcPort: 9889,
		apiPort: 9997,
	},
};

export const STREAMS_UPDATE_INTERVAL = (1 * 30 + 0) * 1000;
export const THUMBNAILS_UPDATE_INTERVAL = (1 * 15 + 0) * 1000;

interface IServerStreamSource {
	type: string;
	id: string;
}

export interface IServerStreamItem {
	id: string;
	confName: string;
	source: IServerStreamSource | null;
	sourceReady: boolean;
	readers: { type: string }[];
	conf: any;
}

export interface IServerStreams {
	items: { [key: string]: IServerStreamItem };
}
