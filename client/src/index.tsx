import 'bootstrap/scss/bootstrap.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary';
import App from './features/app/app';
import store from './store';
import './style.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<HashRouter>
					<App />
				</HashRouter>
			</Provider>
		</ErrorBoundary>
	</React.StrictMode>
);
