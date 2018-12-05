import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { editStudent, clearSelectedStudent } from './../../actions/index';

class StudentEdit extends React.PureComponent {
  renderError({error, touched}) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    };
  }

  renderInput = ({ input, label, meta, initialValue }) => {
    console.log(initialValue);
    const className= `field ${meta.error && meta.touched? 'error': ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input 
          placeholder={initialValue}
          className="form-control"
          {...input}
        />
        <div className="text-help">
          {this.renderError(meta)}
        </div>
      </div>  
    )
  }

  onSubmit = (values) => {
    this.props.editStudent(values, () => {
      this.props.history.push('/');
    });
  }

  onClickCancel = () => {
    this.props.clearSelectedStudent();
  }

  render() {
    const { student } = this.props;
    if(!student) {
      return <div>{this.props.history.push('/')}</div>;
    }
    return (
      <div className="note">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} 
          className="ui form error">
          <Field 
            label="Firs Name"
            name="firstName"
            initialValue={student.firstName}
            component={this.renderInput}
          />
          <Field 
            label="Last Name"
            name="lastName"
            initialValue={student.lastName}
            component={this.renderInput}
          />
          <Field 
            label="Age"
            name="age"
            initialValue={student.age}
            component={this.renderInput}
          />
          <Field 
            label="Major Studies"
            name="major"
            initialValue={student.major}
            component={this.renderInput}
          />
          <Field 
            label="Hobbies"
            name="hobbies"
            initialValue={student.hobbies.join(',')}
            component={this.renderInput}
          />
          <p>Please enter hobbies separate by comas</p>
          <button type="submit" className="ui primary">Submit</button>
          <Link 
            to="/"
            onClick={this.onClickCancel}
            className="ui danger">
            Cancel
          </Link>
        </form>
      </div>
    )
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Must enter an email';
  }
  if (!values.firstName) {
    errors.firstName = 'Must enter firstName';
  }
  if (!values.lastName) {
    errors.lastName = 'Must enter lastName';
  }
  if (!values.age) {
  errors.age = 'Must enter age';
  }
  if (!values.major) {
  errors.major = 'Must enter major studies';
  }

  return errors;
}

const mapStateToProps = (state) => {
  return { student: state.studentSelected };
}

export default reduxForm({
  validate,
  form: 'newStudentForm'
})(
  connect(mapStateToProps, {
    editStudent, clearSelectedStudent
  })(StudentEdit)
  );