import React, { Component } from "react";

export default class LogoutButton extends Component {
  logout = () => {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <button type="button" className="logout-btn" onClick={this.logout}>
          Log out
        </button>
      </div>
    );
  }
}
