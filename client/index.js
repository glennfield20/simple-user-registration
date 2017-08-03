import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = createStore(
	(state = {}) => state,
	applyMiddleware(thunk)
)

render(
	<BrowserRouter>
		<Provider store={store}>
			<App>
				<Switch>
					<Route exact path="/" component={Greetings} />
					<Route path="/signup" component={SignupPage} />
				</Switch>	
			</App>
		</Provider>
	</BrowserRouter>,
	document.getElementById('app')
)
