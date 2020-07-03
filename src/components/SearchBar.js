import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      userInput: this.props.userInput
    }
  }

  /*handleChange = (e) => {
    this.props.handleChange(e.target.value);
  }*/
    
  render() {
    return (
        <input
          type="text"
          name="search-bar"
          className="search-bar"
          placeholder="Search for a book."
          value={this.state.userInput}
          onChange={this.props.handleChange}
        />
    );
  }
}
