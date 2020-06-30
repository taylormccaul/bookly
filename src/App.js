import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
//import ReactDOM from 'react-dom';
//import firebase from './firebase.js';

const API_URL = `https://www.googleapis.com/books/v1/volumes`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      items: [],
      itemTitle: '',
      itemAuthor: '',
      itemImage: '',
      itemDescription: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    axios.get(`${API_URL}?q=${this.state.userInput}&maxResults=15`)
    .then(data => {
      this.setState({
        items: [...data.data.items]
      });
      console.log(this.state.items[0]['volumeInfo'].title)
    });
  }

  handleClick(item) {
    console.log(this.state.items[item.currentTarget.id.substring(6, 7)]['volumeInfo'].description);
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search-bar" className="search-bar" placeholder="Search for a book." value={this.state.userInput} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        <div className="search-results">
          {this.state.items.map((item, index) => {
            let volumeInfo = this.state.items[index]['volumeInfo'];
            return (
              <div className="search-result" onClick={this.handleClick} id={`result${index}`}>
                <img src={volumeInfo.imageLinks.thumbnail} alt="" />
                {volumeInfo.title.length > 40 ?
                <p>{volumeInfo.title.substring(0, 40) + "..."}</p>
                :
                <p>{volumeInfo.title}</p>
                }
              </div>
            )
          })}
        </div>
        {/*<button type="submit">+</button>*/}
      </div>
    )
  }
}

export default App;
