import React, { useEffect, useState } from 'react';
import Spinner, { SpinnerProps } from 'react-bootstrap/Spinner';

interface IDotSpinnerProps extends Omit<SpinnerProps, 'animation'> {}

const SHOW_SPINNER_WAIT_INTERVAL = 300;

export const DotSpinner = ({ children = 'Пошук', className, variant = 'secondary', ...props }: IDotSpinnerProps) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const tm = window.setTimeout(setShow, SHOW_SPINNER_WAIT_INTERVAL, true);
		return () => clearTimeout(tm);
	}, []);

	if (!show) return <></>;
	return (
		<div className={`d-flex justify-content-center align-items-center ${className || ''}`}>
			<div className="mr-1 mt-n1">{children}</div>
			<Spinner {...props} animation="grow" variant={variant} />
		</div>
	);
};
