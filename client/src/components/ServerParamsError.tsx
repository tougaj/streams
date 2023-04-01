import React from 'react';
import notFoundImage from '../img/undraw_page_not_found_re_e9o6.svg';
import Caption from './caption';

interface IServerParamsErrorProps extends React.AllHTMLAttributes<HTMLDivElement> {}
const ServerParamsError = ({ title }: IServerParamsErrorProps) => {
	return (
		<Caption className="text-danger" level={4} imgSrc={notFoundImage} title={title}>
			<div>Зверніться до адміністратора сайту</div>
		</Caption>
	);
};

export default ServerParamsError;
