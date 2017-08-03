import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'
import App from './components/App'

render(
	<BrowserRouter>
		<App>
			<Switch>
				<Route exact path="/" component={Greetings} />
				<Route path="/signup" component={SignupPage} />
			</Switch>	
		</App>
	</BrowserRouter>,
	document.getElementById('app')
)
