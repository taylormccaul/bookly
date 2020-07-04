import React, { Component } from "react";

export default class EmailForm extends Component {
  handleEmail = (e) => {
    this.props.handleEmail(e);
  }

  render() {
    return (
      <input type="email" className="email-form" onChange={this.handleEmail} />
    );
  }
}
