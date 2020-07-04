import React, { Component } from "react";

export default class LoginButton extends Component {
  handleLoginSubmit = () => {
    this.props.handleLoginSubmit();
  };

  render() {
    return (
      <button
        type="button"
        className="login-btn"
        onClick={this.handleLoginSubmit}
      >
        Log in
      </button>
    );
  }
}