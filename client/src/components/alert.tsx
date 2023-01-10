import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsCheckLg, BsInfoCircle, BsPencilSquare, BsQuestionCircle, BsXLg } from 'react-icons/bs';
import { IWithTS, WithTS } from './hoc/withTS';

interface IWithChildren {
	children: JSX.Element | string;
}

interface IAlertProps extends IWithTS, IWithChildren {
	title: string;
	callback?: () => void;
	color?: string;
	icon?: JSX.Element;
}
const _Alert = (props: IAlertProps) => {
	const { title, children, color, icon, callback, ts } = props;

	const [show, setShow] = useState(true);

	const handleClose = () => {
		if (callback && show) callback();
		setShow(false);
	};

	useEffect(() => {
		setShow(true);
	}, [ts]);

	return (
		<Modal centered show={show} onHide={handleClose}>
			<Modal.Header closeButton className={`bg-${color || 'primary'} secondary-light-text`}>
				<Modal.Title>
					{icon || <BsInfoCircle className="me-2" />}
					{title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant={`outline-${color || 'primary'}` as any} onClick={handleClose}>
					<BsCheckLg className="me-2" />
					Добре
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

interface IConfirmProps extends IWithTS, IWithChildren {
	title: string;
	callback?: (result: boolean | undefined) => void;
	withCancel?: boolean;
}
const _Confirm = ({ title, children, callback, ts, withCancel = false }: IConfirmProps) => {
	const [show, setShow] = useState(true);

	const handleClose = (event?: React.MouseEvent<HTMLElement>) => {
		let result = undefined;
		if (event) {
			const dataResult = event.currentTarget.dataset.result;
			if (dataResult) result = parseInt(dataResult) === 1;
		}
		if (callback && show) callback(result);
		setShow(false);
	};

	useEffect(() => {
		setShow(true);
	}, [ts]);

	return (
		<Modal centered show={show} onHide={handleClose}>
			<Modal.Header closeButton className="bg-warning secondary-light-text">
				<Modal.Title>
					<BsQuestionCircle className="me-2" />
					{title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-secondary" onClick={handleClose} data-result={1}>
					Так
				</Button>
				<Button variant="outline-secondary" onClick={handleClose} data-result={0}>
					Ні
				</Button>
				{withCancel && (
					<Button variant="outline-secondary" onClick={handleClose} data-result={undefined}>
						<BsXLg className="me-2" />
						Відміна
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
};

interface IPromptProps extends IWithTS {
	title: string;
	initialValue: string | undefined;
	helpText?: JSX.Element | string;
	callback: (result: string | undefined) => void;
}
const _Prompt = (props: IPromptProps) => {
	const { title, callback, ts, initialValue = '', helpText } = props;

	const [show, setShow] = useState(true);
	const [value, setValue] = useState(initialValue);

	const handleClose = (event?: React.FormEvent) => {
		let result = undefined;

		if (event) {
			event.preventDefault();
			if (event.type === 'submit') result = value;
		}
		callback(result);
		setShow(false);
	};

	const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

	useEffect(() => {
		setValue(initialValue);
		setShow(true);
	}, [ts, initialValue]);

	const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
	useEffect(() => {
		if (!show) return;
		const input = inputRef.current as HTMLInputElement;
		if (!input) return;
		input.focus();
		input.select();
	}, [show, inputRef]);

	return (
		<Modal centered show={show} onHide={handleClose}>
			<Modal.Header closeButton className="bg-light">
				{/* <Modal.Header closeButton className="bg-dark secondary-light-text"> */}
				<Modal.Title>
					<BsPencilSquare className="me-2" />
					{title}
				</Modal.Title>
			</Modal.Header>
			<form onSubmit={handleClose} onReset={handleClose}>
				<Modal.Body>
					<input
						type="text"
						value={value}
						onChange={onValueChange}
						className="form-control"
						required
						ref={inputRef}
					/>
					{helpText && <small className="form-text text-muted">{helpText}</small>}
				</Modal.Body>
				<Modal.Footer>
					<Button type="submit" variant="outline-primary">
						<BsCheckLg className="me-2" />
						Добре
					</Button>
					<Button type="reset" variant="outline-secondary">
						<BsXLg className="me-2" />
						Відміна
					</Button>
				</Modal.Footer>
			</form>
		</Modal>
	);
};

/**
 * Необходимость добавления временной метки обусловлена тем, что при закрытии диалога
 * он физически не уничтожается, а остается в DOM-дереве (хотя и не виден).
 * Поэтому при вызове такого же диалога снова его состояние не будет обновлено и,
 * соответственно, он так и останется не видимым. Добавление временной метки позволяет
 * обновить состояние диалога (сделать его видимым) при ее изменении.
 */

export const Alert = WithTS(_Alert);
export const Confirm = WithTS(_Confirm);
export const Prompt = WithTS(_Prompt);
