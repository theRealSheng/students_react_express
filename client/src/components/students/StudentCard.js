import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudent, clearSelectedStudent } from '../../actions';

class StudentCard extends React.Component {
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
      <div>
        <Link to='/' className="btn">Return Main</Link>
        <h1>Review Student</h1>
        <div><img alt={student.firstName} src={student.photo} /></div>
        <h2>{student.firstName} {student.lastName}</h2>
        <h3>Birthday: {student.birthday}</h3>
        <h3>Hobbies: </h3>
        <ul>{hobbyList}</ul>
          <div className="btn-container">
            <button onClick={this.onDeleteClick} className="btn">Delete</button>
            <Link to="/student-edit">Edit</Link>
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
})(StudentCard);
