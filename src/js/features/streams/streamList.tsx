import React, { useEffect, useState } from 'react';
import { showSystemError } from '../../alerts';
import { DotSpinner } from '../../components/spinner';
import { IServerStreamItem, IServerStreams } from '../../init';
import Stream from './stream';

interface IStreamListProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const StreamList = ({}: IStreamListProps) => {
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
					.filter(({ sourceReady }) => sourceReady);
				setStreams(items);
			})
			.catch(showSystemError);
	}, []);

	if (!streams) return <DotSpinner>Завантаження відео...</DotSpinner>;
	return (
		<div className="stream-list__container">
			{streams.map(({ id, readers }) => (
				<Stream key={id} streamId={id} />
			))}
		</div>
	);
};

export default StreamList;
