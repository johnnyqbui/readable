import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import store from './store';

const history = createBrowserHistory();

ReactDOM.render(
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<App />
		</ConnectedRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
