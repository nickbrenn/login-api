import React, { Component } from "react";
import { Button, Form, FormGroup, FormFeedback, Input } from "reactstrap";
import axios from "axios";

class Login extends Component {
  state = {
    username: "",
    password: ""
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
  };

  render() {
    return (
      <div className="Login">
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
