import apiClient from './apiClient'

const getAllCount = async () => {
	return await apiClient('/user/count')
}

const dashboardApi = {
	getAllCount,
}

export default dashboardApi
