import React from "react";
import { Route, Switch } from "react-router-dom";
import "../App.css";
import Home from "../routes/Home";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/:category?/:post?" component={Home}/>
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  );
}

export default App;