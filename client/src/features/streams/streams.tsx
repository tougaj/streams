import React, { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { showSystemError } from '../../alerts';
import ServerParamsError from '../../components/ServerParamsError';
import { IStreamServerParams } from '../../init';
import { RootState } from '../../store';
import { changeStreamServerParams } from '../app/appSlice';
import StreamList from './streamList';

interface IStreamsProps extends PropsFromRedux, React.AllHTMLAttributes<HTMLDivElement> {}
const Streams = ({ streamServerParams, changeStreamServerParams }: IStreamsProps) => {
	const { streamId } = useParams<'streamId'>();

	useEffect(() => {
		if (streamServerParams) return;

		const loadParams = async () => {
			try {
				const response = await fetch(`api/params`, {
					// headers: {
					// 	Authorization: `Bearer ${accessToken}`,
					// 	'c-user-email': userEmail
					// },
				});
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
				}
				const params = (await response.json()) as IStreamServerParams;
				changeStreamServerParams(params);
			} catch (error) {
				showSystemError(error as Error);
			}
		};

		loadParams();
	}, [streamServerParams, changeStreamServerParams]);

	if (streamServerParams) {
		const { address, hlsPort, webRtcPort } = streamServerParams;
		if (!address) return <ServerParamsError title="На задано адресу сервера трансляцій" />;
		if (!(hlsPort || webRtcPort)) return <ServerParamsError title="На задано жодного порту трансляцій" />;
	}

	return (
		<div className="row">
			{streamId && (
				<div className="col-12 col-lg-9">
					<Outlet />
				</div>
			)}
			<div className={streamId ? 'col-12 col-lg-3' : 'col-12'}>
				<StreamList activeStreamId={streamId} />
			</div>
		</div>
	);
};

const mapState = (state: RootState) => ({
	streamServerParams: state.app.streamServerParams,
});

const mapDispatch = {
	changeStreamServerParams,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Streams);
