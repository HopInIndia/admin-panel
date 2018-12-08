var initialState = {
	user: {
		isLoggedIn: false,
		error: null
	}
}

export default function user(state = initialState, action = {}) {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				user: {
					...action.payload,
					error: null,
					isLoggedIn: true,     		
				}
			}
		case 'LOGIN_FAILED':
			return {
				...state,
				user: {
					...action.payload,
					isLoggedIn: false,
				}
			}
		case 'LOGOUT_SUCCESS':
			return {
				...state,
				user: {
					isLoggedIn: false,
					error: null,
				}
			}
		default:
			return {
				...state
			}
	}
}
