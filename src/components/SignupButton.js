import React, { Component } from "react";

export default class SignupButton extends Component {
  handleSignupSubmit = () => {
    this.props.handleSignupSubmit();
  }

  render() {
    return (
      <button
        type="button"
        className="signup-btn"
        onClick={this.handleSignupSubmit}
      > 
        Sign up
      </button>
    );
  }
}