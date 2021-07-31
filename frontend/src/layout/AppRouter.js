import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Layout from './'
import Login from '../pages/Login'
import { AuthProvider } from '../context/AuthContext'

function AppRouter() {
	return (
		<Router>
			<AuthProvider>
				<div>
					<Switch>
						<Route path="/login/:path?" exact>
							<Route to="/login">
								<Login />
							</Route>
						</Route>
						<Route>
							<Layout />
						</Route>
					</Switch>
				</div>
			</AuthProvider>
		</Router>
	)
}

export default AppRouter
