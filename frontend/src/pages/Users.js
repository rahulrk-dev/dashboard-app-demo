import { useEffect, useReducer, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import usersApi from '../api/users'
import userReducer from '../reducers/userReducer'
import Table from '../components/Table'
import Form from '../components/Form'
import Modal from '../components/Modal'

const initialState = {
	users: [],
	error: null,
	loading: true,
}

function Users() {
	const [{ users }, dispatch] = useReducer(userReducer, initialState)
	const [addModal, setAddModal] = useState(false)
	const [updateModal, setUpdateModal] = useState(false)
	const [formInitial, setFormInitial] = useState({})

	const getUsersList = async () => {
		let res = await usersApi.getAllUsers()
		res.data.forEach((user) => (user.companyName = user?.company?.name || ''))
		dispatch({ type: 'GET_USERS', payload: res.data })
	}

	useEffect(() => {
		getUsersList()
	}, [])

	const handleUserRemove = async (id) => {
		if (!window.confirm('Are you sure you want to delete?')) return

		await usersApi.removeUser(id)
		dispatch({ type: 'DELETE_USER', payload: id })
	}

	const handleAddOpen = () => setAddModal(true)
	const handleAddClose = () => setAddModal(false)
	const handleUpdateOpen = () => setUpdateModal(true)
	const handleUpdateClose = () => setUpdateModal(false)

	const handleAddSubmit = async (e, inputs) => {
		e.preventDefault()

		await usersApi.addUser(inputs)
		dispatch({ type: 'ADD_USER', payload: inputs })
		handleAddClose()
	}

	const handleUpdateSubmit = async (e, inputs, id) => {
		e.preventDefault()

		await usersApi.updateUser(id, inputs)
		dispatch({ type: 'UPDATE_USER', payload: { inputs, id } })
		handleUpdateClose()
	}

	return (
		<div>
			<Typography variant="h3" component="h4">
				User List
			</Typography>
			<Button variant="contained" color="primary" onClick={handleAddOpen}>
				Add User
			</Button>
			<Table
				items={users}
				handleRemove={handleUserRemove}
				handleEditClick={async (id) => {
					let res = await usersApi.getUser(id)
					res.data.companyName = res.data?.company?.name || ''
					setFormInitial(res)
					handleUpdateOpen()
				}}
				handleSort={(key, direction) => {
					const sortUser = users.sort((a, b) =>
						direction === 1
							? a[key] > b[key]
								? 1
								: -1
							: a[key] < b[key]
							? 1
							: -1
					)
					dispatch({ type: 'GET_USERS', payload: sortUser })
				}}
				headers={[
					'Name',
					'Email',
					'DOB',
					'Gender',
					'Company',
					'Created',
					'Company Created',
					'Action',
				]}
			/>
			<Modal open={addModal} onClose={handleAddClose}>
				<Form onSubmit={handleAddSubmit} />
			</Modal>
			<Modal open={updateModal} onClose={handleUpdateClose}>
				<Form
					onSubmit={handleUpdateSubmit}
					initState={formInitial}
					title="Update User"
				/>
			</Modal>
		</div>
	)
}

export default Users
