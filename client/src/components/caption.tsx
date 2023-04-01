import classNames from 'classnames';
import React from 'react';

interface ICaptionProps extends React.AllHTMLAttributes<HTMLDivElement> {
	level?: number;
	imgSrc?: string;
	imgClassName?: string;
	imageFirst?: boolean;
}
const Caption = ({
	imageFirst = false,
	level = 5,
	title,
	className,
	imgSrc,
	imgClassName = 'caption__image',
	children,
	...rest
}: ICaptionProps) => {
	return (
		<div className={classNames(`h${level}`, 'd-flex flex-column gap-3 align-items-center', className)} {...rest}>
			<div className={classNames(imageFirst && 'order-1')}>{title}</div>
			{children}
			{imgSrc && <img src={imgSrc} className={imgClassName} alt="No results" />}
		</div>
	);
};

export default Caption;
