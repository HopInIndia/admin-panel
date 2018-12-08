import config from '~/config'

export const getAccessToken = async () => {
	const refreshToken = window.localStorage.getItem('refreshToken')
	const accessToken = window.localStorage.getItem('accessToken')
	if(accessToken){
		return accessToken
	}else{
		try{
			const response = await fetch(`${config.apiBase}/oauth/token?refreshToken=${refreshToken}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': '3eIx0mgR6zXTRp8Eorz1UoWpF3ua4Q1h',
				}
			})
			if(response.status === 200){
				const responseBody = await response.json()
				if(responseBody.success) {
					window.localStorage.setItem('accessToken', responseBody.accessToken)
					return responseBody.accessToken
				}
				return null
			}
			return null
		}catch(error){
			return null
		}
	}
}