import moment from 'moment';

export type TStringWithUndefined = string | undefined;
export type TNumberWithUndefined = number | undefined;

export interface IErrorResponse {
	error: string;
}

export const CURRENT_DATE = moment().startOf('day');

export const DEFAULTS = {
	pageTitle: 'Streams',
	fluid: true,
	streamServer: {
		address: 'http://132.226.223.144',
		hlsPort: 8888,
		apiPort: 9997,
	},
};
