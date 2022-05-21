import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { DEFAULTS } from '../../init';

interface IStreamProps extends React.AllHTMLAttributes<HTMLDivElement> {
	streamId: string;
	streamClassName?: string;
	autoPlay?: boolean;
}
const Stream = ({ streamId, streamClassName, autoPlay = false }: IStreamProps) => {
	const refPlayer = useRef<ReactPlayer>();
	const [ready, setReady] = useState(false);

	const onReady = () => {
		setReady(true);
	};

	return (
		<PlayerWrapper className={streamClassName}>
			<Player
				url={`${DEFAULTS.streamServer.address}:${DEFAULTS.streamServer.hlsPort}/${streamId}/index.m3u8`}
				playing={autoPlay && ready}
				controls
				width="100%"
				height="100%"
				// onProgress={onProgress}
				onReady={onReady}
				ref={refPlayer}
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
