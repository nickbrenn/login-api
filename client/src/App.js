import React, { Component } from "react";
import { Route } from "react-router-dom";

import Login from "./components/Login";
import Content from "./components/Content";

class App extends Component {
  render() {
    return (
      <div>
        <Route
          path="/"
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
