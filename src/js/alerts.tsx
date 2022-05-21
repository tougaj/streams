import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Alert, Confirm, Prompt } from './components/alert';
import Icon from './components/icon';

let modalContainer: HTMLElement;

export const showAlert = (body: JSX.Element | string, title: string = 'Сповіщення', callback?: () => void) => {
	ReactDOM.render(
		<Alert title={title} callback={callback} color="info" icon={<Icon name="info-circle" className="me-2" />}>
			{body}
		</Alert>,
		modalContainer
	);
};

export const showError = (body: JSX.Element | string, title: string = 'Помилка', callback?: () => void) => {
	ReactDOM.render(
		<Alert
			title={title}
			callback={callback}
			color="danger"
			icon={<Icon name="exclamation-triangle" className="me-2" />}
		>
			{body}
		</Alert>,
		modalContainer
	);
};

export const showSystemError = (error: Error, title: string = 'Помилка отримання даних') =>
	showError(error.message, title);
// export const showSystemError = (error: Error, title: string = 'Помилка отримання даних', callback?: () => void) => showError(error.message, title, callback);

export const showConfirm = (
	body: JSX.Element | string,
	title: string = 'Підтвердження',
	callback: (result: boolean | undefined) => void
) => {
	ReactDOM.render(
		<Confirm title={title} callback={callback}>
			{body}
		</Confirm>,
		modalContainer
	);
};

export const showPromiseError = (body: JSX.Element | string, title?: string) =>
	new Promise((resolve) => {
		const callback = () => resolve(undefined);
		showError(body, title, callback);
	});

export const showPromiseConfirm = (body: JSX.Element | string, title: string = 'Підтвердження') =>
	new Promise((resolve) => {
		const callback = (result: boolean | undefined) => resolve(result);
		showConfirm(body, title, callback);
	});

export const showPrompt = (
	callback: (result: string | undefined) => void,
	title: string = 'Ввод даних',
	initialValue?: string,
	helpText?: JSX.Element | string
) => {
	ReactDOM.render(
		<Prompt title={title} callback={callback} initialValue={initialValue} helpText={helpText} />,
		modalContainer
	);
};

export const showPromisePrompt = (
	title: string = 'Ввод даних',
	initialValue?: string,
	helpText?: JSX.Element | string
): Promise<string | undefined> =>
	new Promise((resolve) => {
		const callback = (result: string | undefined) => resolve(result);
		showPrompt(callback, title, initialValue, helpText);
	});

window.addEventListener('DOMContentLoaded', (event) => {
	modalContainer = document.createElement('div');
	modalContainer.setAttribute('id', 'modal-alert');
	document.body.appendChild(modalContainer);
});
