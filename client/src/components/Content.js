import React, { Component } from "react";
import { Button } from "reactstrap";

class Content extends Component {
  componentDidMount = () => {
    if (this.props.verified === false) {
      if (localStorage.getItem("token")) {
        this.props.setLogin();
      } else this.props.history.push("/login");
    }
  };
  render() {
    if (this.props.userData && this.props.userData.username) {
      return (
        <div className="content">
          <div>Content that only {this.props.userData.username} can see.</div>
          <Button
            color="danger"
            onClick={() => {
              this.props.setLogout();
              this.props.history.push("/login");
            }}
          >
            Log Out
          </Button>
        </div>
      );
    } else if (this.props.userData === false) {
      return (
        <div className="content">You don't have access to this content.</div>
      );
    } else {
      return <div className="content">Loading...</div>;
    }
  }
}

export default Content;
