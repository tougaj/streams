import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import StreamList from './streamList';

interface IStreamsProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const Streams = ({}: IStreamsProps) => {
	const { streamId } = useParams<'streamId'>();

	return (
		<div className="row">
			{streamId && (
				<div className="col-12 col-lg-9 col-xxl-10">
					<Outlet />
				</div>
			)}
			<div className={streamId ? 'col-12 col-lg-3 col-xxl-2' : 'col-12'}>
				<StreamList activeStreamId={streamId} />
			</div>
		</div>
	);
};

export default Streams;
