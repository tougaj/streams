import classNames from 'classnames';
import React from 'react';
import { BsBoxArrowUpRight, BsCameraVideo, BsFillCameraVideoFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import TextIcon from '../../components/textIcon';
import { DEFAULTS } from '../../init';
import Stream from './stream';

interface IStreamListItemProps extends React.AllHTMLAttributes<HTMLDivElement> {
	streamId: string;
	active: boolean;
}
const StreamListItem = ({ streamId, active }: IStreamListItemProps) => {
	return (
		<div>
			<Link to={streamId} className={active ? 'text-primary' : 'text-secondary'}>
				<Stream streamId={streamId} thumbnailOnly />
			</Link>
			<div className="d-flex justify-content-between align-items-center">
				<Link to={streamId} className={classNames('fs-4 text-truncate', active ? 'text-primary' : 'text-secondary')}>
					<TextIcon Icon={active ? BsFillCameraVideoFill : BsCameraVideo}>{streamId}</TextIcon>
				</Link>
				<a
					target="_blank"
					rel="noreferrer"
					href={`${DEFAULTS.streamServer.address}:${DEFAULTS.streamServer.webRtcPort}/${streamId}/`}
					className="text-secondary mt-1"
					title="Відкрити в новому вікні"
				>
					<BsBoxArrowUpRight className="mt-n1" />
					{/* <TextIcon Icon={BsBroadcast} iconLast>
						RTC
					</TextIcon> */}
				</a>
			</div>
		</div>
	);
};

export default StreamListItem;
