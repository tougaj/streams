import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { showSystemError } from '../../alerts';
import Icon from '../../components/icon';
import { DotSpinner } from '../../components/spinner';
import { IServerStreamItem, IServerStreams, TStringWithUndefined } from '../../init';
import Stream from './stream';

interface IStreamListProps extends React.AllHTMLAttributes<HTMLDivElement> {
	activeStreamId: TStringWithUndefined;
}
const StreamList = ({ activeStreamId }: IStreamListProps) => {
	const [streams, setStreams] = useState<IServerStreamItem[] | undefined>();

	useEffect(() => {
		fetch('streamList.json')
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
				setStreams(items);
			})
			.catch(showSystemError);
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

export default StreamList;
