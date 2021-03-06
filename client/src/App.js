import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

import Register from "./components/Register";
import Login from "./components/Login";
import Content from "./components/Content";

const urls = require("./config.json");

class App extends Component {
  state = {
    verified: false,
    userData: null
  };
  setLogin = () => {
    if (localStorage.getItem("token")) {
      axios
        .get(`${urls[urls.basePath]}/users/verify/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.setState({ verified: true, userData: response.data.user });
        })
        .catch(error => {
          this.setState({ verified: false, userData: false });
          localStorage.removeItem("token");
        });
    } else this.setState({ verified: false, userData: false });
  };
  setLogout = () => {
    localStorage.removeItem("token");
    this.setState({ verified: false, userData: null });
  };
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <Redirect to="/login" />} />
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
            return (
              <Content
                {...props}
                verified={this.state.verified}
                userData={this.state.userData}
                setLogin={this.setLogin}
                setLogout={this.setLogout}
              />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
