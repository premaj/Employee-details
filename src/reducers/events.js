import _ from 'lodash'
import {
  CREATE_EMPLOYEE,
  READ_EMPLOYEES,
  READ_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from '../actions'

export default (employees = {}, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE:
    case READ_EMPLOYEE:
    case UPDATE_EMPLOYEE:
      const data = action.response.data
      return { ...employees, [data.id]: data }
    case READ_employees:
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EMPLOYEE:
      delete employees[action.id]
      return { ...employees }
    default:
      return employees
  }
}
