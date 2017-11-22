import React from 'react';
import Search from './Search.jsx';
import Diff from './Diff.jsx';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route
  // Link,
  // Redirect,
  // withRouter,
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Search />} />
          <Route exact path="/diff" render={() => <Diff />} />
        </div>
      </Router>
    );
  }
}

export default App;
