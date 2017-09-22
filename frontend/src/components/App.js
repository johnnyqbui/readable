import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../App.css';

import Home from '../routes/Home';
import CreateEditPosts from '../routes/CreateEditPosts';

import * as ReadableApi from '../utils/ReadableApi';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Readable</h2>
        </div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/create' component={CreateEditPosts} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App