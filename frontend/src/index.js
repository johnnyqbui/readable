import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import store from './store';

const history = createHistory();

ReactDOM.render(
	<Provider store={ store }>
		<ConnectedRouter history={ history }>
			<App />
		</ConnectedRouter>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
