import ReactDOM from 'react-dom/client';
import { BsExclamationTriangle, BsInfoCircle } from 'react-icons/bs';
import { Alert, Confirm, Prompt } from './components/alert';

let modalRoot: ReactDOM.Root;

export const showAlert = (body: JSX.Element | string, title: string = 'Сповіщення', callback?: () => void) => {
	modalRoot.render(
		<Alert title={title} callback={callback} color="info" icon={<BsInfoCircle className="me-2" />}>
			{body}
		</Alert>
	);
};

export const showError = (body: JSX.Element | string, title: string = 'Помилка', callback?: () => void) => {
	modalRoot.render(
		<Alert title={title} callback={callback} color="danger" icon={<BsExclamationTriangle className="me-2" />}>
			{body}
		</Alert>
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
	modalRoot.render(
		<Confirm title={title} callback={callback}>
			{body}
		</Confirm>
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
	modalRoot.render(<Prompt title={title} callback={callback} initialValue={initialValue} helpText={helpText} />);
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
	const modalContainer = document.createElement('div');
	document.body.appendChild(modalContainer);
	modalRoot = ReactDOM.createRoot(modalContainer);
});
