import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { DEFAULTS, THUMBNAILS_UPDATE_INTERVAL } from '../../init';

interface IStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {
	streamId: string;
	streamClassName?: string;
	thumbnailOnly?: boolean;
	live?: boolean;
}
const Stream = ({ streamId, streamClassName, thumbnailOnly = false, live = false }: IStreamProps) => {
	const refPlayer = useRef<ReactPlayer>(null);
	const [ready, setReady] = useState(false);
	const [timeStamp, setTimeStamp] = useState<number>(new Date().valueOf());

	const onReady = () => {
		setReady(true);
	};

	const onDuration = (duration: number) => {
		if (!thumbnailOnly) {
			refPlayer.current?.seekTo(1, 'fraction');
		}
	};

	useEffect(() => {
		const timer = setInterval(() => setTimeStamp(new Date().valueOf()), THUMBNAILS_UPDATE_INTERVAL);
		return () => clearInterval(timer);
	}, [streamId]);

	return (
		<div className={classNames(streamClassName, 'player__wrapper')}>
			{thumbnailOnly || !live ? (
				<ReactPlayer
					url={`${DEFAULTS.streamServer.address}:${DEFAULTS.streamServer.hlsPort}/${streamId}/index.m3u8?ts=${
						thumbnailOnly ? timeStamp : ''
					}`}
					playing={!thumbnailOnly && ready}
					controls={!thumbnailOnly}
					width="100%"
					height="100%"
					// onProgress={onProgress}
					onReady={onReady}
					ref={refPlayer}
					onDuration={onDuration}
					className="player__player"
				/>
			) : (
				<iframe
					src={`${DEFAULTS.streamServer.address}:${DEFAULTS.streamServer.webRtcPort}/${streamId}/`}
					width="100%"
					height="100%"
					className="player__player"
					title={streamId}
				/>
			)}
		</div>
	);
};

export default Stream;

// const PlayerWrapper = styled.div`
// 	position: relative;
// 	padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
// `;

// const Player = styled(ReactPlayer)`
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// `;

// const VideoFrame = styled.iframe`
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// `;
