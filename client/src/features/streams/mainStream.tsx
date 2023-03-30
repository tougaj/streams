import { BsXCircle } from 'react-icons/bs';
import { Link, Navigate, useParams } from 'react-router-dom';
import TextIcon from '../../components/textIcon';
import { selectAppState, useAppSelector } from '../../store';
import { StickyDiv } from '../../styledComponents';
import Stream from './stream';

// interface IMainStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const MainStream = () => {
	const { streamId } = useParams<'streamId'>();
	const { streams } = useAppSelector(selectAppState);

	if (!streamId) return <></>;
	if (!streams.some((stream) => stream.id === streamId)) return <Navigate to=".." replace />;
	return (
		<StickyDiv className="mb-2">
			<Stream streamId={streamId} autoPlay />
			<div className="d-flex justify-content-between align-items-center my-2">
				<h3 className="text-center m-0">{streamId}</h3>
				<Link to="/stream" className="btn btn-secondary">
					<TextIcon Icon={BsXCircle}>Закрити</TextIcon>
				</Link>
			</div>
		</StickyDiv>
	);
};

export default MainStream;
