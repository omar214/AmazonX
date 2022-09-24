import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';

// redux
import store from './redux/store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);
