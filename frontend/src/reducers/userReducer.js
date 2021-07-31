function userReducer(state, action) {
	switch (action.type) {
		case 'GET_USERS':
			return {
				...state,
				loading: false,
				users: action.payload,
			}
		case 'DELETE_USER':
			return {
				...state,
				users: state.users.filter((user) => user._id !== action.payload),
			}
		case 'ADD_USER':
			return {
				...state,
				users: [action.payload, ...state.users],
			}
		case 'UPDATE_USER':
			const idx = state.users.findIndex(
				(user) => user._id === action.payload.id
			)
			state.users[idx] = action.payload.inputs
			return {
				...state,
			}
		default:
			return state
	}
}

export default userReducer
