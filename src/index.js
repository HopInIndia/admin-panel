import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import store from '~/redux'

import App from '~/app'

import '~/assets/scss/style.css'

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'))
