import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import StreamList from './streamList';

interface IStreamsProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const Streams = ({}: IStreamsProps) => {
	const { streamId } = useParams<'streamId'>();

	return (
		<div className="row">
			{streamId && (
				<div className="col-6">
					<Outlet />
				</div>
			)}
			<div className={streamId ? 'col-6' : 'col-12'}>
				<StreamList />
			</div>
		</div>
	);
};

export default Streams;
