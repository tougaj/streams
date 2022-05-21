import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../../components/icon';
import { StickyDiv } from '../../styledComponents';
import Stream from './stream';

interface IMainStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const MainStream = ({}: IMainStreamProps) => {
	const { streamId } = useParams<'streamId'>();

	if (!streamId) return <></>;
	return (
		<StickyDiv className="mb-2">
			<Stream streamId={streamId} autoPlay />
			<div className="text-center mt-2">
				<Link to="/stream" className="btn btn-outline-secondary">
					<Icon name="x-circle">Закрити</Icon>
				</Link>
			</div>
		</StickyDiv>
	);
};

export default MainStream;
