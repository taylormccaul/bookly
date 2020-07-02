import React, { Component } from "react";

export default class EmailForm extends Component {
  constructor(props) {
    super(props);
  }

  handleEmail = (e) => {
    this.props.handleEmail(e);
  }

  render() {
    return (
      <input type="email" className="email-form" onChange={this.handleEmail} />
    );
  }
}
