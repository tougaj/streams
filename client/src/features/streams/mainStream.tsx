import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsFillCameraVideoFill, BsPower } from 'react-icons/bs';
import { Link, Navigate, useParams } from 'react-router-dom';
import TextIcon from '../../components/textIcon';
import { selectAppState, useAppSelector } from '../../store';
import { StickyDiv } from '../../styledComponents';
import Stream from './stream';

// interface IMainStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const MainStream = () => {
	const { streamId } = useParams<'streamId'>();
	const { streams } = useAppSelector(selectAppState);
	const [live, setLive] = useState(true);

	const onLiveClick = (event: React.MouseEvent<HTMLInputElement>) => {
		setLive((live) => !live);
	};

	if (!streamId) return <></>;
	if (!streams.some((stream) => stream.id === streamId)) return <Navigate to=".." replace />;
	return (
		<StickyDiv className="mb-2">
			<Stream streamId={streamId} live={live} />
			<div className="d-flex justify-content-between align-items-center my-2">
				<h3 className="text-center m-0">
					<BsFillCameraVideoFill /> {streamId}
				</h3>
				<Form.Check type="switch" id="cbMainIsLive" label="Пряма трансляція" checked={live} onClick={onLiveClick} />
				<Link to="/stream" className="btn btn-outline-secondary">
					<TextIcon Icon={BsPower} className="icon-lg">
						Вимкнути
					</TextIcon>
				</Link>
			</div>
		</StickyDiv>
	);
};

export default MainStream;
