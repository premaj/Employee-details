import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { postEmployee } from '../actions'

class EventsNew extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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

  async onSubmit(values) {
    await this.props.postEmployee(values)
    this.props.history.push('/')
  }

  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin: 12 }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div><Field label="EMp Name" name="employee_name" type="text" component={this.renderField} /></div>
        <div><Field label="Emp Salary" name="employee_salary" type="text" component={this.renderField} /></div>

        <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
        <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />}/>
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

const mapDispatchToProps = ({ postEmployee })

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'employeeNewForm' })(employeesNew)
)
