import React, { Component } from "react";
import { Button, Form, FormGroup, FormFeedback, Input } from "reactstrap";
import axios from "axios";

const urls = require("../config.json");

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: ""
  };

  validateForm() {
    return (
      this.state.username.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post(`${urls[urls.basePath]}/users/register`, {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log("Error:", error);
        this.setState({ username: "", password: "", confirmPassword: "" });
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
              invalid={this.state.usernameInvalid}
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
              invalid={
                this.state.password.length > 0 &&
                (!/[A-Z]/.test(this.state.password) ||
                  !/\d/.test(this.state.password))
              }
              value={this.state.password}
              onChange={this.handleChange}
              autoComplete="current-password"
            />
            <FormFeedback>
              Your password must contain at least one number and capital letter.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <h5>Confirm Password</h5>
            <Input
              id="confirmPassword"
              type="password"
              invalid={this.state.confirmPassword !== this.state.password}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
            <FormFeedback>
              Please confirm your password to register.
            </FormFeedback>
          </FormGroup>
          <Button
            block
            color="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit
          </Button>
          <Button
            color="danger"
            onClick={() => this.props.history.push("/login")}
          >
            Go to Login Page
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;
