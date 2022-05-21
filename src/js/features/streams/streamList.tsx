import axios from 'axios';
import React, { useEffect } from 'react';
import { showSystemError } from '../../alerts';
import { DEFAULTS } from '../../init';

interface IStreamListProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const StreamList = ({}: IStreamListProps) => {
	useEffect(() => {
		axios(`${DEFAULTS.streamServer.address}:${DEFAULTS.streamServer.apiPort}/v1/paths/list`, {
			method: 'GET',
			withCredentials: true,
			credentials: 'same-origin',
			mode: 'no-cors',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
		})
			.then((data: any) => {
				console.log(data);
			})
			.catch(showSystemError);
	}, []);

	return <div className="">StreamList</div>;
};

export default StreamList;
