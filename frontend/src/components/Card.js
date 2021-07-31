import { Card as MICard, CardContent, Typography } from '@material-ui/core'
import './styles/card.css'

function Card({ title, data }) {
	return (
		<MICard variant="outlined" className="card">
			<CardContent>
				<Typography color="textSecondary" gutterBottom>
					{title}
				</Typography>

				<Typography variant="body2" component="p">
					{data}
				</Typography>
			</CardContent>
		</MICard>
	)
}

export default Card
