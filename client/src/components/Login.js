import React, { Component } from "react";
import { Button, Form, FormGroup, FormFeedback, Input } from "reactstrap";
import axios from "axios";

const urls = require("../config.json");

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      axios
        .get(`${urls[urls.basePath]}/users/verify/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.props.history.push("/content");
        })
        .catch(error => {
          localStorage.removeItem("token");
        });
    }
  };

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`${urls[urls.basePath]}/users/login`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.props.history.push("/content");
        } else this.setState({ invalidInput: true, password: "" });
      })
      .catch(error => {
        // console.log("Error:", error);
        this.setState({ invalidInput: true, password: "" });
      });
  };

  render() {
    return (
      <div className="login">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <h5>Username</h5>
            <Input
              autoFocus
              id="username"
              type="username"
              invalid={this.state.invalidInput}
              value={this.state.username}
              onChange={this.handleChange}
              autoComplete="username"
            />
          </FormGroup>
          <FormGroup>
            <h5>Password</h5>
            <Input
              id="password"
              type="password"
              invalid={this.state.invalidInput}
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <FormFeedback>
              The username or password you entered are incorrect.
            </FormFeedback>
          </FormGroup>
          <Button
            block
            color="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <Button
            color="danger"
            onClick={() => this.props.history.push("/register")}
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
