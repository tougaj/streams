import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../../components/icon';
import Stream from './stream';

interface IMainStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const MainStream = ({}: IMainStreamProps) => {
	const { streamId } = useParams<'streamId'>();

	if (!streamId) return <></>;
	return (
		<>
			<Stream streamId={streamId} />
			<div className="text-center mt-2">
				<Link to="/stream" className="btn btn-outline-secondary">
					<Icon name="x-circle">Закрити</Icon>
				</Link>
			</div>
		</>
	);
};

export default MainStream;
