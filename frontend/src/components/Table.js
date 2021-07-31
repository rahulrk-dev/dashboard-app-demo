import {
	Button,
	ButtonGroup,
	Paper,
	Table as MUTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core'
import moment from 'moment'
import { useState } from 'react'

function Table({
	items,
	handleRemove,
	handleEditClick,
	handleSort,
	headers = [],
}) {
	const [direction, setDirection] = useState(
		() =>
			items.length &&
			Object.fromEntries(Object.entries(items).map(([key]) => [key, -1]))
	)

	return (
		<TableContainer component={Paper} className="table">
			<MUTable aria-label="simple table">
				<TableHead>
					<TableRow>
						{headers &&
							headers.map((header, idx) => (
								<TableCell
									key={`${header}-${idx}`}
									onClick={() => {
										const lowerHeader = header.replace(' ', '').toLowerCase()
										if (/name|companycreated/.test(lowerHeader)) {
											const currentDirection = direction[lowerHeader]
											handleSort(lowerHeader, currentDirection)
											setDirection(() => ({
												...direction,
												[lowerHeader]: currentDirection === 1 ? -1 : 1,
											}))
										}
									}}
								>
									{header}
								</TableCell>
							))}
					</TableRow>
				</TableHead>
				<TableBody>
					{items &&
						items.map((item) => {
							return (
								<TableRow key={item._id}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.email}</TableCell>
									<TableCell>
										{moment(item.dob).format('DD MMM YYYY')}
									</TableCell>
									<TableCell>{item.gender}</TableCell>
									<TableCell>{item?.companyName}</TableCell>
									<TableCell>
										{moment(item.createdAt).format('DD MMM YYYY hh:mm A')}
									</TableCell>
									<TableCell>
										{moment(item?.company?.createdAt).format(
											'DD MMM YYYY hh:mm A'
										)}
									</TableCell>
									<TableCell>
										<ButtonGroup
											variant="outlined"
											aria-label="contained primary button group"
										>
											<Button
												color="primary"
												onClick={() => handleEditClick(item._id)}
											>
												Edit
											</Button>
											<Button
												color="secondary"
												onClick={() => handleRemove(item._id)}
											>
												Delete
											</Button>
										</ButtonGroup>
									</TableCell>
								</TableRow>
							)
						})}
				</TableBody>
			</MUTable>
		</TableContainer>
	)
}

export default Table
