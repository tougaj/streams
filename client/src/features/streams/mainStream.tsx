import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { BsFillCameraVideoFill, BsPower } from 'react-icons/bs';
import { Link, Navigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DEFAULTS } from '../../init';
import { selectAppState, useAppSelector } from '../../store';
import { StickyDiv } from '../../styledComponents';
import Stream from './stream';

// interface IMainStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const MainStream = () => {
	const { streamId } = useParams<'streamId'>();
	const { streams } = useAppSelector(selectAppState);
	const { streamServerParams } = useAppSelector(selectAppState);
	const [live, setLive] = useState(!!streamServerParams?.webRtcPort);

	const onLiveClick = () => {
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
			<Stream streamId={streamId} live={live} streamServerParams={streamServerParams} />
			<div className="d-flex justify-content-between align-items-center my-2 gap-1">
				<h3 className="text-center m-0 text-truncate">
					<BsFillCameraVideoFill /> {streamId}
				</h3>
				<ToggleButtonGroup type="radio" onChange={onLiveClick as any} value={live ? 1 : 0} name="rgStreamSource">
					{streamServerParams?.hlsPort && (
						<ToggleButton id="rgHLS" value={0} variant="outline-primary" title="Використовувати HLS">
							Трансляція
						</ToggleButton>
					)}
					{streamServerParams?.webRtcPort && (
						<ToggleButton id="rgWebRTC" value={1} variant="outline-primary" title="Використовувати WebRTC">
							Джерело
						</ToggleButton>
					)}
				</ToggleButtonGroup>
				{/* <Link to="/stream" className="btn btn-outline-secondary">
					<TextIcon Icon={BsPower} className="icon-lg">
						<span className="d-none d-sm-inline">Вимкнути</span>
					</TextIcon>
				</Link> */}
			</div>
			<PowerOff to="/stream" className="btn btn-sm btn-danger position-absolute" title="Припинити перегляд">
				<BsPower className="icon-lg mt-n1" />
			</PowerOff>
		</StickyDiv>
	);
};

export default MainStream;

const PowerOff = styled(Link)`
	top: 0.25rem;
	right: 0.25rem;
`;
