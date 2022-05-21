import classNames from 'classnames';
import React from 'react';

interface IIconProps extends React.AllHTMLAttributes<HTMLDivElement> {
	name: string;
}
const Icon = ({ name, className, children, ...rest }: IIconProps) => {
	return children ? (
		<span>
			<i className={classNames('me-1 bi', `bi-${name}`, className)} {...rest}></i>
			{children}
		</span>
	) : (
		<i className={classNames('bi', `bi-${name}`, className)} {...rest}></i>
	);
};

export default Icon;
