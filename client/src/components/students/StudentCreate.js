import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createStudent } from '../../actions';

class StudentCreate extends React.Component {
  renderError({error, touched}) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    };
  }
  renderField = ({ input, label, meta }) => {
    const className= `field ${meta.error && meta.touched? 'error': ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input type={label==='Age'? 'number': 'string'} {...input} autoComplete="off"/>
        {this.renderError(meta)}
      </div>
    );
  }

  onSubmit = (values) => {
    if (values.hobbies) {
      values.hobbies = values.hobbies.split(',');
    }
    this.props.createStudent(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="note">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field 
            label="Email"
            name="email"
            component={this.renderField}
          />
          <Field 
            label="Firs Name"
            name="firstName"
            component={this.renderField}
          />
          <Field 
            label="Last Name"
            name="lastName"
            component={this.renderField}
          />
          <Field 
            label="Age"
            name="age"
            component={this.renderField}
          />
          <Field 
            label="Major Studies"
            name="major"
            component={this.renderField}
          />
          <Field 
            label="Photo Link"
            name="photo"
            component={this.renderField}
          />
          <Field 
            label="Hobbies(**)"
            name="hobbies"
            component={this.renderField}
          />
          <p>**Note: Please enter hobbies separate by comas</p>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
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
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  }

  if (!values.major) {
  errors.major = 'Must enter major studies';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'newStudentForm'
})(
  connect(null, { createStudent })(StudentCreate)
  );