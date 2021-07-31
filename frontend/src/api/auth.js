import apiClient from './apiClient'

const login = async (body) => {
	return await apiClient('/auth/login', 'POST', body)
}

const getCurrentUser = async (id) => {
	const response = await apiClient('/auth/user/' + id)

	return response
}

const authApi = {
	login,
	getCurrentUser,
}

export default authApi
