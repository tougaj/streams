import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Icon from '../../components/icon';
import { selectAppState, useAppSelector } from '../../store';
import { StickyDiv } from '../../styledComponents';
import Stream from './stream';

interface IMainStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const MainStream = ({}: IMainStreamProps) => {
	const { streamId } = useParams<'streamId'>();
	const { streams } = useAppSelector(selectAppState);

	if (!streamId) return <></>;
	if (!streams.some((stream) => stream.id === streamId)) return <Navigate to=".." replace />;
	return (
		<StickyDiv className="mb-2">
			<Stream streamId={streamId} autoPlay />
			<h3 className="text-center my-2">{streamId}</h3>
			<div className="text-center mt-2">
				<Link to="/stream" className="btn btn-secondary">
					<Icon name="x-circle">Закрити</Icon>
				</Link>
			</div>
		</StickyDiv>
	);
};

export default MainStream;
