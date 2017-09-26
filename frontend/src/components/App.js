import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';

import Home from '../routes/Home';
import CreateEditPosts from '../routes/CreateEditPosts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/:category?' render={({match, history}) =>
            <Home match={match} history={history}></Home>
          }/>
          <Route path='/create' component={CreateEditPosts} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App