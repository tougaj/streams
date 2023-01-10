import classNames from 'classnames';
import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';

interface ITextIconProps extends React.AllHTMLAttributes<HTMLDivElement> {
	Icon: IconType;
}
const TextIcon = ({ Icon, className, children, ...rest }: ITextIconProps) => {
	return children ? (
		<span>
			<Icon className={classNames('me-1', className)} {...(rest as IconBaseProps)} />
			{children}
		</span>
	) : (
		<Icon className={className} {...(rest as IconBaseProps)} />
	);
};

export default TextIcon;
