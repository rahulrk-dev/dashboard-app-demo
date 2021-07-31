import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import authApi from '../api/auth'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
	const [user, setUser] = useState()
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [loadingInitial, setLoadingInitial] = useState(true)

	const history = useHistory()
	const location = useLocation()

	useEffect(() => {
		if (error) setError(null)
	}, [location.pathname])

	useEffect(() => {
		authApi
			.getCurrentUser(user?._id)
			.then((user) => {
				setUser(user)
				history.push('/')
			})
			.catch((_error) => {})
			.finally(() => setLoadingInitial(false))
	}, [])

	function login(email, password) {
		setLoading(true)

		return authApi
			.login({ email, password })
			.then((user) => {
				setUser(user.data)
				history.push('/')
				return user
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false))
	}

	const memoedValue = useMemo(
		() => ({
			user,
			loading,
			error,
			login,
		}),
		[user, loading, error]
	)

	return (
		<AuthContext.Provider value={memoedValue}>
			{!loadingInitial && children}
		</AuthContext.Provider>
	)
}

export default function useAuth() {
	return useContext(AuthContext)
}
