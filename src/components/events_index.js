import React, { Component } from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { readmployees } from '../actions'

class employeesIndex extends Component {
  componentDidMount() {
    this.props.reademployees()
  }

  renderEmployees() {
    return _.map(this.props.employees, employee => (
      <TableRow key={employee.id}>
        <TableRowColumn>{employee.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/employees/${employee.id}`}>
            {employee.employee_name}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{employee.employee_salary}</TableRowColumn>
      </TableRow>
    ))
  }

  render() {
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12
    }
    return (
      <React.Fragment>
        <FloatingActionButton style={style} containerElement={<Link to="/employees/new" />}>
          <ContentAdd />
        </FloatingActionButton>

        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>employee_name</TableHeaderColumn>
              <TableHeaderColumn>employee_salary</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false}>
            {this.renderEmployees()}
          </TableBody>
        </Table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ employees: state.employees })

const mapDispatchToProps = ({ readEmployees })

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesIndex)
