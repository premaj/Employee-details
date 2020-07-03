import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import employees from './events'

export default combineReducers({ employees, form })
