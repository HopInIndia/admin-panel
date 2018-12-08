import config from '~/config'
import { getAccessToken } from '~/redux/helpers'

export const userInfo = (accessToken) => async (dispatch) => {
	try{
		const accessToken = await getAccessToken()
		const response = await fetch(`${config.apiBase}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': '3eIx0mgR6zXTRp8Eorz1UoWpF3ua4Q1h',
				'Authorization': `Bearer ${accessToken}`,
			}
		})
		if(response.status === 200){
			const responseBody = await response.json()
			if(responseBody.success){
				dispatch({
					type: 'LOGIN_SUCCESS',
					payload: responseBody.user
				})
				return true
			}
		}
		dispatch({
			type: 'LOGIN_FAILED',
			payload: {
				error: "An error has occured."
			}
		})
		return false
	}catch(error){
		dispatch({
			type: 'LOGIN_FAILED',
			payload: {
				error: error
			}
		})
		return false
	}
}

export const login = (credentials) => async (dispatch) => {
	try{
		const response = await fetch(`${config.apiBase}/oauth/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': '3eIx0mgR6zXTRp8Eorz1UoWpF3ua4Q1h'
			},
			body: JSON.stringify(credentials)
		})
		if(response.status === 200){
			const responseBody = await response.json()
			if(responseBody.success){
				window.localStorage.setItem('accessToken', responseBody.accessToken)
				window.localStorage.setItem('refreshToken', responseBody.refreshToken)
				dispatch({
					type: 'LOGIN_SUCCESS',
					payload: responseBody.user
				})
				return true
			}
		}
		dispatch({
			type: 'LOGIN_FAILED',
			payload: {
				error: "Invalid credentials."
			}
		})
		return false
	}catch(error){
		dispatch({
			type: 'LOGIN_FAILED',
			payload: {
				error: error
			}
		})
		return false
	}
}

export const logout = () => {
	window.localStorage.removeItem('accessToken')
	window.localStorage.removeItem('refreshToken')
	return {
		type: 'LOGOUT_SUCCESS',
		payload: {}
	}
}