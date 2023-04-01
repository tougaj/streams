import classNames from 'classnames';
import React from 'react';
import { BsBoxArrowUpRight, BsCameraVideo, BsFillCameraVideoFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import TextIcon from '../../components/textIcon';
import { IStreamServerParams } from '../../init';
import Stream from './stream';

interface IStreamListItemProps extends React.AllHTMLAttributes<HTMLDivElement> {
	streamId: string;
	active: boolean;
	streamServerParams?: IStreamServerParams;
}
const StreamListItem = ({ streamId, active, streamServerParams }: IStreamListItemProps) => {
	if (!streamServerParams?.address) return <></>;

	return (
		<div>
			<Link to={streamId} className={active ? 'text-primary' : 'text-secondary'}>
				<Stream streamId={streamId} thumbnailOnly streamServerParams={streamServerParams} />
			</Link>
			<div className="d-flex justify-content-between align-items-center">
				<Link to={streamId} className={classNames('fs-4 text-truncate', active ? 'text-primary' : 'text-secondary')}>
					<TextIcon Icon={active ? BsFillCameraVideoFill : BsCameraVideo}>{streamId}</TextIcon>
				</Link>
				{streamServerParams.webRtcPort && (
					<a
						target="_blank"
						rel="noreferrer"
						href={`${streamServerParams.address}:${streamServerParams.webRtcPort}/${streamId}/`}
						className="text-secondary mt-1"
						title="Відкрити в новому вікні"
					>
						<BsBoxArrowUpRight className="mt-n1" />
					</a>
				)}
			</div>
		</div>
	);
};

export default StreamListItem;
