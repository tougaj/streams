import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { BsFillCameraVideoFill, BsPower } from 'react-icons/bs';
import { Link, Navigate, useParams } from 'react-router-dom';
import TextIcon from '../../components/textIcon';
import { DEFAULTS } from '../../init';
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
			<Helmet>
				<title>
					{streamId}::{DEFAULTS.pageTitle}
				</title>
			</Helmet>
			<Stream streamId={streamId} live={live} />
			<div className="d-flex justify-content-between align-items-center my-2 gap-1">
				<h3 className="text-center m-0 text-truncate">
					<BsFillCameraVideoFill /> {streamId}
				</h3>
				<Form.Check
					type="switch"
					id="cbMainIsLive"
					label={
						<>
							<span className="d-none d-sm-inline">Пряма трансляція</span>
							<span className="d-sm-none">live</span>
						</>
					}
					checked={live}
					onClick={onLiveClick}
					className="text-truncate"
				/>
				<Link to="/stream" className="btn btn-outline-secondary">
					<TextIcon Icon={BsPower} className="icon-lg">
						<span className="d-none d-sm-inline">Вимкнути</span>
					</TextIcon>
				</Link>
			</div>
		</StickyDiv>
	);
};

export default MainStream;
