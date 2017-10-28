import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import NotFound from "./NotFound";
import "../App.css";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/404/" component={ NotFound } />
        <Route path="/" component={ Home } />
      </Switch>
    </div>
  );
}

export default App;