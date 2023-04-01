export type TStringWithUndefined = string | undefined;
export type TNumberWithUndefined = number | undefined;

export interface IErrorResponse {
	error: string;
}

export const DEFAULTS = {
	pageTitle: 'Streams',
	fluid: true,
};

export const STREAMS_UPDATE_INTERVAL = (1 * 30 + 0) * 1000;
export const THUMBNAILS_UPDATE_INTERVAL = (1 * 15 + 0) * 1000;

export interface IStreamServerParams {
	address: string | null;
	hlsPort: number | null;
	webRtcPort: number | null;
}

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
