import React from 'react';
import { render } from 'react-dom';
import {
  HashRouter as Router,
  Route
  // Link,
  // Redirect,
  // withRouter,
} from 'react-router-dom';

import Main from './Main.jsx';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Main />} />
        </div>
      </Router>
    );
  }
}

export default App;
