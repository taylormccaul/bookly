import React, { Component } from "react";

export default class PasswordForm extends Component {
  constructor(props) {
    super(props);
  }

  handlePassword = (e) => {
    this.props.handlePassword(e);
  };

  render() {
    return (
      <input
        type="password"
        className="password-form"
        onChange={this.handlePassword}
      />
    );
  }
}
