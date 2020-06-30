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
      itemDescription: '',
      opened: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this);
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

  handleClick(e) {
    let currentTarget = this.state.items[e.currentTarget.id.substring(6, 7)]['volumeInfo'];
    let title = currentTarget.title;
    let author = currentTarget.author;
    let description = currentTarget.description;

    this.setState({
      itemTitle: title,
      itemAuthor: author,
      itemImage: currentTarget.imageLinks.thumbnail,
      itemDescription: description,
      opened: true
    });
  }

  goBack() {
    this.setState({
      opened: false
    });
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search-bar" className="search-bar" placeholder="Search for a book." value={this.state.userInput} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        {this.state.opened ?
        <div className="preview">
          <header>
            <div className="info">
              <h2>{this.state.itemTitle}</h2>
              <h3>{this.state.itemAuthor}</h3>
            </div>
            <div className="back">
              <button className="back-button" onClick={this.goBack}>Go Back</button>
            </div>
          </header>
          <div className="img-and-desc">
            <div className="img">
              <img src={this.state.itemImage} alt="" />
              <button type="submit">Add to currently reading</button>
              <button type="submit">Add to favorite books</button>
            </div>
            <div className="desc">
              <p>{this.state.itemDescription}</p>
            </div>
          </div>
        </div>
        :
        <div className="search-results">
          {this.state.items.map((item, index) => {
            let volumeInfo = this.state.items[index]['volumeInfo'];
            return (
              <div className="search-result" onClick={this.handleClick} id={`result${index}`}>
                <img src={volumeInfo.imageLinks.thumbnail} alt="" />
                {volumeInfo.title.length > 40 ?
                <div>
                  <p>{volumeInfo.title.substring(0, 40) + "..."}</p>
                  <p>by {volumeInfo.authors}</p>
                </div>
                :
                <div>
                  <p>{volumeInfo.title}</p>
                  <p>by {volumeInfo.authors}</p>
                </div>
                }
              </div>
            )
          })}
        </div>
        }
        {/*<button type="submit">+</button>*/}
      </div>
    )
  }
}

export default App;
