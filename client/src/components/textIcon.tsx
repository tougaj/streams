import classNames from 'classnames';
import React from 'react';
import { IconBaseProps, IconType } from 'react-icons';

interface ITextIconProps extends React.AllHTMLAttributes<HTMLDivElement> {
	Icon: IconType;
	iconLast?: boolean;
}
const TextIcon = ({ Icon, className, children, iconLast = false, ...rest }: ITextIconProps) => {
	return children ? (
		<span className="d-flex gap-1 align-items-center">
			<Icon className={classNames(className, iconLast && 'order-1')} {...(rest as IconBaseProps)} />
			{children}
		</span>
	) : (
		<Icon className={className} {...(rest as IconBaseProps)} />
	);
};

export default TextIcon;
