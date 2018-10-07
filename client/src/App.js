import React, { Component } from "react";
import { Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <div>
        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} />;
          }}
        />
        <Route
          exact
          path="/login"
          render={props => {
            return <Login {...props} />;
          }}
        />
        <Route
          exact
          path="/content"
          render={props => {
            return <Content {...props} />;
          }}
        />
      </div>
    );
  }
}

export default App;
