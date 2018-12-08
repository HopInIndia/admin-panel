import { combineReducers } from 'redux'
import user from './user'
import destination from './destination'

const reducer = combineReducers({
	user,
	destination
})

export default reducer