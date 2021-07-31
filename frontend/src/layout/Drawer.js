import { useState } from 'react'
import { Drawer, ListItem, ListItemText, Typography } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'
import './styles/layout.css'

function ListItemLink(props) {
	return <ListItem button component={RouterLink} {...props} />
}

function AppDrawer() {
	const [drawerOpen, setDrawerOpen] = useState(true)

	const handleDrawerOpen = () => {
		setDrawerOpen(true)
	}

	const handleDrawerClose = () => {
		setDrawerOpen(false)
	}

	return (
		<div className="drawer">
			<Drawer
				className="drawer__inner"
				variant="persistent"
				open={drawerOpen}
				onClose={handleDrawerClose}
			>
				<Typography variant="h4" component="h5" className="heading">
					Demo App
				</Typography>
				<ListItemLink to="/">
					<ListItemText primary="Dashboard" />
				</ListItemLink>
				<ListItemLink to="/users">
					<ListItemText primary="User List" />
				</ListItemLink>
			</Drawer>
		</div>
	)
}

export default AppDrawer
