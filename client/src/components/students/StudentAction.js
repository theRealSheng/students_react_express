import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent, clearSelectedStudent } from '../../actions';

class StudentAction extends React.Component {
  onDeleteClick = () => {
    const { email } = this.props.student;
    this.props.deleteStudent(email);
    this.props.clearSelectedStudent();
  }

  render() {
    const { student } = this.props;
    if(!student) {
      return <div>{this.props.history.push('/')}</div>;
    }

    let hobbyList = 'No hobbies';
    if (student.hobbies && student.hobbies.length > 0) {
      hobbyList = student.hobbies.map((hobby) => {
       return <li key={`${student.firstName}-${hobby}`} className="list-item"><h3>{hobby.trim()}</h3></li>
      });
    }

    return (
      <div className="wrapper">
        <Link to='/' className="btn btn-back"><h2> &#8592; Return Main</h2></Link>
        <div className="headline-wrapper">
          <h1>Review Student</h1>
        </div>
        <div><img alt={student.firstName} src={student.photo} /></div>
        <h2>{student.firstName} {student.lastName}</h2>
        <h3>Age: {student.age}</h3>
        <h3>Hobbies: </h3>
        <ul>{hobbyList}</ul>
          <div className="btn-container">
            <Link className="primary" to="/student-edit">Edit</Link>
            <button onClick={this.onDeleteClick} className="btn danger">Delete</button>
          </div>
      </div>
    );
  }
}

const maptStateToprops = (state) => {
  return { student: state.studentSelected };
}

export default connect(maptStateToprops, { 
  deleteStudent, clearSelectedStudent
})(StudentAction);
