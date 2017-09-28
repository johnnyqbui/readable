import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';

import Home from '../routes/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/:category?' render={({match, location, history}) =>
            <Home match={match} location={location} history={history}></Home>
          }/>
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App