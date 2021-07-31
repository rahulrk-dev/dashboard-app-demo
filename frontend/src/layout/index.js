import { Route, Switch, useHistory } from 'react-router-dom'
import useAuth from '../context/AuthContext'
import Home from '../pages/Home'
import Users from '../pages/Users'
import AppDrawer from './Drawer'

function Layout() {
	const { user } = useAuth()
	const history = useHistory()
	if (user?.role !== 'ADMIN') history.push('/login')

	return (
		<div className="layout">
			<AppDrawer />
			<main className="main">
				<Route>
					<Switch>
						<Route path="/users">
							<Users />
						</Route>
						<Route path="/" exact>
							<Home />
						</Route>
					</Switch>
				</Route>
			</main>
		</div>
	)
}

export default Layout
