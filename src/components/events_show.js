import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { getemployee, deleteemployee, putemployee } from '../actions'

class employeesShow extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) this.props.getemployee(id)
  }

  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field

    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    )
  }

  async onDeleteClick() {
    const { id } = this.props.match.params
    await this.props.deleteemployee(id)
    this.props.history.push('/')
  }

  async onSubmit(values) {
    await this.props.putemployee(values)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="EMp Name" name="employee_name" type="text" component={this.renderField} /></div>
        <div><Field label="employee_salary" name="employee_salary" type="text" component={this.renderField} /></div>

        <div>
          <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
          <RaisedButton label="Delete" style={style} onClick={this.onDeleteClick}/>
        </div>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  if (!values.employee_name) errors.employee_name = "Enter a employee_name, please."
  if (!values.employee_salary) errors.employee_salary = "Enter a employee_salary, please."

  return errors
}

const mapStateToProps = (state, ownProps) => {
  const employee = state.employees[ownProps.match.params.id]
  return { initialValues: employee, employee }
}

const mapDispatchToProps = ({ deleteemployee, getemployee, putemployee })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'employeeShowForm', enableReinitialize: true })(EmployeesShow)
)
