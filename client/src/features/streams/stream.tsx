import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { IStreamServerParams, THUMBNAILS_UPDATE_INTERVAL } from '../../init';

interface IStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {
	streamId: string;
	streamClassName?: string;
	thumbnailOnly?: boolean;
	live?: boolean;
	streamServerParams?: IStreamServerParams;
}
const Stream = ({
	streamId,
	streamClassName,
	thumbnailOnly = false,
	live = false,
	streamServerParams,
}: IStreamProps) => {
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

	if (!streamServerParams?.address) return <></>;
	const isHlsPlayer = streamServerParams.hlsPort !== null && (thumbnailOnly || !live || !streamServerParams.webRtcPort);

	return (
		<div className={classNames(streamClassName, 'player__wrapper')}>
			{isHlsPlayer ? (
				<ReactPlayer
					url={`${streamServerParams.address}:${streamServerParams.hlsPort}/${streamId}/index.m3u8?ts=${
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
					src={`${streamServerParams.address}:${streamServerParams.webRtcPort}/${streamId}/`}
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
