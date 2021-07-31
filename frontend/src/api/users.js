import apiClient from './apiClient'

const getAllUsers = async () => {
	return await apiClient('/user')
}

const addUser = async (body) => {
	return await apiClient('/user', 'POST', body)
}

const removeUser = async (id) => {
	return await apiClient('/user/' + id, 'DELETE')
}

const getUser = async (id) => {
	return await apiClient('/user/' + id)
}

const updateUser = async (id, body) => {
	return await apiClient('/user/' + id, 'PUT', body)
}

const usersApi = {
	getAllUsers,
	addUser,
	removeUser,
	getUser,
	updateUser,
}

export default usersApi
