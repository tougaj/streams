import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { DEFAULTS, THUMBNAILS_UPDATE_INTERVAL } from '../../init';

interface IStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {
	streamId: string;
	streamClassName?: string;
	autoPlay?: boolean;
	thumbnailOnly?: boolean;
}
const Stream = ({ streamId, streamClassName, autoPlay = false, thumbnailOnly = false }: IStreamProps) => {
	// const refPlayer = useRef<ReactPlayer>();
	const [ready, setReady] = useState(false);
	const [timeStamp, setTimeStamp] = useState<number>(new Date().valueOf());

	const onReady = () => {
		setReady(true);
	};

	useEffect(() => {
		const timer = setInterval(() => setTimeStamp(new Date().valueOf()), THUMBNAILS_UPDATE_INTERVAL);
		return () => clearInterval(timer);
	}, [streamId]);

	return (
		<PlayerWrapper className={streamClassName}>
			<Player
				url={`${DEFAULTS.streamServer.address}:${DEFAULTS.streamServer.hlsPort}/${streamId}/index.m3u8?ts=${
					thumbnailOnly ? timeStamp : ''
				}`}
				playing={autoPlay && !thumbnailOnly && ready}
				controls={!thumbnailOnly}
				width="100%"
				height="100%"
				// onProgress={onProgress}
				onReady={onReady}
				// ref={refPlayer}
			/>
		</PlayerWrapper>
	);
};

export default Stream;

const PlayerWrapper = styled.div`
	position: relative;
	padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`;

const Player = styled(ReactPlayer)`
	position: absolute;
	top: 0;
	left: 0;
`;
