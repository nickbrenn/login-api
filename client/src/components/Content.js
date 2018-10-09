import React, { Component } from "react";

class Content extends Component {
  state = {
    verified: false
  };
  componentDidMount = () => {
    if (this.state.verified === false) {
      if (localStorage.getItem("token")) {
        console.log("we got a token here");
      }
    }
  };
  render() {
    return <div>CONTENT</div>;
  }
}

export default Content;
