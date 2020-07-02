import React, { Component } from "react";

export default class SignupButton extends Component {
  constructor(props) {
    super(props);
  }

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