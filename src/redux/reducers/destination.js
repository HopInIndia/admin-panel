let initialState = {
	destination: {
		list: []
	}
}

export default function destination(state = initialState, action = {}) {
	let list = state.destination.list
	switch(action.type){
		case 'FETCH_DESTINATION_SUCCESS':
			action.payload.map(destination => list.push(destination))
			return {
				...state,
				destination: {
					list: list
				}
			}
		case 'ADD_DESTINATION_SUCCESS':
			list.push(action.payload)
			return {
				...state,
				destination: {
					list: list
				}
			}
		default:
			return {
				...state,
			}
	}
}