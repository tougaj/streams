import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { showSystemError } from '../../alerts';
import Icon from '../../components/icon';
import { DotSpinner } from '../../components/spinner';
import { DEFAULTS, IServerStreams, STREAMS_UPDATE_INTERVAL, TStringWithUndefined } from '../../init';
import { RootState } from '../../store';
import { changeStreams } from '../app/appSlice';
import Stream from './stream';

interface IStreamListProps extends PropsFromRedux, React.AllHTMLAttributes<HTMLDivElement> {
	activeStreamId: TStringWithUndefined;
}
const StreamList = ({ activeStreamId, streams, changeStreams }: IStreamListProps) => {
	const loadStreamList = () => {
		fetch(`${DEFAULTS.streamServer.address}:${DEFAULTS.streamServer.apiPort}/v1/paths/list`)
			// fetch('streamList.json')
			.then((response) => {
				if (!response.ok) throw new Error(response.statusText);
				return response.json();
			})
			.then((r: IServerStreams) => {
				const items = Object.entries(r.items)
					.map(([id, item]) => {
						item.id = id;
						return item;
					})
					.filter(({ sourceReady, id }) => sourceReady);
				changeStreams(items);
			})
			.catch(showSystemError);
	};

	useEffect(() => {
		loadStreamList();
		const timer = setInterval(loadStreamList, STREAMS_UPDATE_INTERVAL);
		return () => clearInterval(timer);
	}, [activeStreamId]);

	if (!streams) return <DotSpinner>Завантаження відео...</DotSpinner>;
	return (
		<div className="stream-list__container">
			{streams.map(({ id }) => (
				<Link key={id} to={id} className={id === activeStreamId ? 'text-primary' : 'text-secondary'}>
					<Stream streamId={id} thumbnailOnly />
					<div className="text-center fs-4">
						{id === activeStreamId && <Icon name="eye" className="me-2" />}
						{id}
					</div>
				</Link>
			))}
		</div>
	);
};

const mapState = (state: RootState) => ({
	streams: state.app.streams,
});

const mapDispatch = { changeStreams };

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(StreamList);
