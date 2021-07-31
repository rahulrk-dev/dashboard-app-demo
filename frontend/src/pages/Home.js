import { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import dashboardApi from '../api/dashboard'
import Card from '../components/Card'
import './styles/home.css'

function Home() {
	const [counts, setCounts] = useState({})

	const getAllCount = async () => {
		const res = await dashboardApi.getAllCount()

		setCounts(res.data)
	}

	useEffect(() => {
		getAllCount()
	}, [])

	return (
		<div className="home">
			<Typography variant="h3" component="h4">
				Dashboard
			</Typography>
			<div className="home__data">
				<Card title="Total Users" data={counts.allUsers} />
				<Card title="Companies" data={counts.companies} />
				<Card title="Admin" data={counts.admin} />
				<Card title="User" data={counts.users} />
				<Card title="Male" data={counts.male} />
				<Card title="Female" data={counts.female} />
			</div>
		</div>
	)
}

export default Home
