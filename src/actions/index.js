import axios from 'axios'

export const READ_EMPLOYEES = 'READ_EMPLOYEES'
export const READ_EMPLOYEE = 'READ_EMPLOYEE'
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE'

const ROOT_URL = 'http://dummy.restapiexample.com/api/v1'


export const readEmployee = () => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/employee`)
  dispatch({ type: READ_EMPLOYEE, response })
}

export const postEmployee = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/create`, values)
  dispatch({ type: CREATE_EMPLOYEE, response })
}

export const putEmployee = values => async dispatch => {
  const response = await axios.put(`${ROOT_URL}/update/${values.id}`, values)
  dispatch({ type: UPDATE_EMPLOYEE, response })
}

export const getEmployee = id => async dispatch => {
  const response = await axios.get(`${ROOT_URL}/employee/${id}`)
  dispatch({ type: READ_EMPLOYEE, response })
}

export const deleteEmployee = id => async dispatch => {
  await axios.delete(`${ROOT_URL}/delete/${id}`)
  dispatch({ type: DELETE_EMPLOYEE, id })
}
