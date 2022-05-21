import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import StreamList from './streamList';

interface IStreamsProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const Streams = ({}: IStreamsProps) => {
	const { streamId } = useParams<'streamId'>();

	return (
		<div className="row">
			{streamId && (
				<div className="col-12 col-xl-8">
					<Outlet />
				</div>
			)}
			<div className={streamId ? 'col-12 col-xl-4' : 'col-12'}>
				<StreamList />
			</div>
		</div>
	);
};

export default Streams;
