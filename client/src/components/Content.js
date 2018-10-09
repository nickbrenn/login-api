import React, { Component } from "react";

class Content extends Component {
  componentDidMount = () => {
    if (this.props.verified === false) {
      if (localStorage.getItem("token")) {
        this.props.setLogin();
      } else this.props.history.push("/login");
    }
  };
  render() {
    console.log("PROPS", this.props);
    if (this.props.userData && this.props.userData.username) {
      return <div>{this.props.userData.username}</div>;
    } else if (this.props.userData === false) {
      return <div>You don't have access to this content.</div>;
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default Content;
