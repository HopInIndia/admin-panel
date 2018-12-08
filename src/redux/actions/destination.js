import config from '~/config'
import { getAccessToken } from '~/redux/helpers'

export const fetchDestinations = (offset = 0, limit = 10) => async (dispatch) => {
	try{
		const accessToken = await getAccessToken()
		const response = await fetch(`${config.apiBase}/destination/?offset=${offset}&limit=${limit}`, {
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
					type: 'FETCH_DESTINATION_SUCCESS',
					payload: responseBody.destinations
				})
				return true
			}
			return false
		}
		return false
	}catch(error){
		return error
	}
} 

export const addDestination = (destinationData) => async (dispatch) => {
	try{
		const accessToken = await getAccessToken()
		const response = await fetch(`${config.apiBase}/destination/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': '3eIx0mgR6zXTRp8Eorz1UoWpF3ua4Q1h',
				'Authorization': `Bearer ${accessToken}`,
			},
			body: JSON.stringify(destinationData)
		})
		if(response.status === 200){
			const responseBody = await response.json()
			if(responseBody.success){
				dispatch({
					type: 'ADD_DESTINATION_SUCCESS',
					payload: responseBody.destination
				})
				return true
			}
			return false
		}
		return false
	}catch(error){
		return error
	}
} 