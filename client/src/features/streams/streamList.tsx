import React, { useEffect } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { showSystemError } from '../../alerts';
import { DotSpinner } from '../../components/spinner';
import { IServerStreams, STREAMS_UPDATE_INTERVAL, TStringWithUndefined } from '../../init';
import { RootState } from '../../store';
import { changeStreams } from '../app/appSlice';
import StreamListItem from './streamListItem';

interface IStreamListProps extends PropsFromRedux, React.AllHTMLAttributes<HTMLDivElement> {
	activeStreamId: TStringWithUndefined;
}
const StreamList = ({ activeStreamId, streams, changeStreams }: IStreamListProps) => {
	const loadStreamList = () => {
		fetch('api/streamList')
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
	}, [activeStreamId]); // eslint-disable-line

	if (!streams) return <DotSpinner>Завантаження відео...</DotSpinner>;
	return (
		<div className="stream-list__container">
			{streams.map(({ id }) => (
				<StreamListItem key={id} streamId={id} active={id === activeStreamId} />
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
