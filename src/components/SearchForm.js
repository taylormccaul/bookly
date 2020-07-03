import React, { Component } from "react";
import axios from 'axios';

const API_URL = `https://www.googleapis.com/books/v1/volumes`;

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: this.props.userInput,
      items: this.props.items,
      opened: this.props.opened,
      searching: this.props.searching,
    };
  }

  handleSubmit = () => {
    /*e.preventDefault();

    axios
      .get(`${API_URL}?q=${this.state.userInput}&maxResults=15`)
      .then((data) => {
        this.setState({
          items: [...data.data.items],
          opened: false,
          searching: true,
        });
      });*/

      this.props.handleSubmit();
  }

  handleChange = (e) => {
    this.setState({
      userInput: e.target.value,
    });
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form">
        <input
          type="text"
          name="search-bar"
          className="search-bar"
          placeholder="Search for a book."
          value={this.state.userInput}
          onChange={this.handleChange}
        />
        <div>
          <button type="submit" className="search-btn">
            Search
          </button>
          <button type="button" className="logout-btn" onClick={this.logout}>
            Log out
          </button>
        </div>
      </form>
    );
  }
}
