const baseUrl = process.env.BASE_URL || 'http://localhost:8000/api/v1'

export default async function apiClient(url, method = 'GET', body) {
	const config = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	}

	if (body) config.body = JSON.stringify(body)

	const res = await fetch(baseUrl + url, config)
	const json = await res.json()

	return json
}
