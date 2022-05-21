import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary';
import App from './features/app/app';
import store from './store';

moment.locale('uk');

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<Provider store={store}>
				<HashRouter>
					<App />
				</HashRouter>
			</Provider>
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('app')
);
