import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudents, selectStudent } from './../../actions';

class StudentList extends React.Component {
  componentDidMount(){
    this.props.fetchStudents();
  }

  onClickSelect = (student) => {
    this.props.selectStudent(student);
  }

  renderCard = (student) => {
    let hobbyList = 'No hobbies';
    if (student.hobbies && student.hobbies.length > 0) {
      hobbyList = student.hobbies.map((hobby) => {
       return <li key={`${student.firstName}-${hobby}`} className="list-item"><h3>{hobby.trim()}</h3></li>
      });
    }

    return(
      <div key={student.email}>
        <Link onClick={() => this.onClickSelect(student)} to={`/student-detail`}>
          <div className="note">
            <div className="image">
              <img src={student.photo} alt={student.name}/>
            </div>
            <div className="content">
              {student.firstName} {student.lastName}, {student.age}
              <div className="meta">
                <span>{student.major}</span>
              </div>
              <div className="description">
                <ul>{hobbyList}</ul>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  render() {
    const { students } = this.props;
    if (students.length === 0) {
      return (
        <div> 
          <h1>There are currently no students in the database. Please click "Create Student"</h1>
           <h2><Link to="/create">Create Student</Link></h2>
        </div>
      );
    }

    return (
      <div>
        <Link to="/create">
          <div className="ui card">
              <h1>Create Student + </h1>
          </div>
        </Link>
        <div className="card-container">
          {this.props.students.map(this.renderCard)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { students: state.studentList };
}

export default connect(mapStateToProps, {
  fetchStudents, selectStudent
})(StudentList);