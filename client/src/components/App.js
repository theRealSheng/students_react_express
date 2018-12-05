import './../../src/App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  createStudent
} from './../actions';

import StudentList from './students/StudentList';
import StudentAction from './students/StudentAction';
import StudentCreate from './students/StudentCreate';
import StudentEdit from './students/StudentEdit';

class App extends React.Component {
  state = {
    studentList: [],
    studentSelected: null
  }

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/" exact component={StudentList} />
              <Route path="/student-edit" exact component={StudentEdit} />
              <Route path="/student-detail" exact component={StudentAction} />
              <Route path="/create" exact component={StudentCreate} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;