import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import StudentList from './students/StudentList';
import StudentCard from './students/StudentCard';
import StudentCreate from './students/StudentCreate';
import StudentEdit from './students/StudentEdit';

class App extends React.Component {

  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/student-edit" exact component={StudentEdit} />
              <Route path="/student-detail" exact component={StudentCard} />
              <Route path="/create" exact component={StudentCreate} />
              <Route path="/" exact component={StudentList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect()(App);