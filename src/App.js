import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Logo from './components/Logo';
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";*/
//import { makeStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import ReactDOM from 'react-dom';
import firebase from './firebase.js';

const API_URL = `https://www.googleapis.com/books/v1/volumes`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      items: [],
      itemTitle: "",
      itemAuthor: "",
      itemImage: "",
      itemDescription: "",
      itemIndex: "",
      opened: false,
      searching: false,
      favorites: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    axios.get(`${API_URL}?q=${this.state.userInput}&maxResults=15`)
    .then((data) => {
      this.setState({
        items: [...data.data.items],
        opened: false,
        searching: true
      });
      console.log(this.state.items[0]["volumeInfo"].title);
    });
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value,
    });
  }

  handleClick(e) {
    let currentTarget = this.state.items[e.currentTarget.id.substring(6, 7)][
      "volumeInfo"
    ];

    let title = currentTarget.title;
    let author = currentTarget.authors;
    let description = currentTarget.description;

    this.setState({
      itemTitle: title,
      itemAuthor: author,
      itemImage: currentTarget.imageLinks.thumbnail,
      itemDescription: description,
      opened: true,
      itemIndex: e.currentTarget.id.substring(6, 7)
    });
  }

  goBack() {
    this.setState({
      opened: false,
    });
  }

  goHome() {
    this.setState({
      opened: false,
      searching: false,
      userInput: '',
    });
  }

  addToFavorites(e) {
    e.preventDefault();

    const favoritesRef = firebase.database().ref('favorites');
    console.log(this.state.items[this.state.itemIndex]['volumeInfo']);
    const newFavorite = {
      title: this.state.itemTitle,
      author: this.state.itemAuthor,
      image: this.state.itemImage,
      id: Date.now(),
    }

    favoritesRef.push(newFavorite);
  }

  componentDidMount() {
    const favoritesRef = firebase.database().ref('favorites');

    favoritesRef.on('value', (snapshot) => {
      let favorites = snapshot.val();
      let newState = [];
      for (let favorite in favorites) {
        newState.push({
          title: favorite,
          id: favorites[favorite],
        });
      }
      
      //console.log(newState);

      this.setState({
        favorites: [...newState]
      });
    });
  }

  render() {
    return (
      <div className="app">
        {/*<Router>
          <Link to="/home">Home</Link>
          <Switch>
            <Route path="/home">
              <Home userInput={this.state.userInput} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            </Route>
          </Switch>
        </Router>*/}
        <form onSubmit={this.handleSubmit}>
          <h1 className="logo" onClick={this.goHome}>Bookly</h1>
          <input
            type="text"
            name="search-bar"
            className="search-bar"
            placeholder="Search for a book."
            value={this.state.userInput}
            onChange={this.handleChange}
          /> 
          <button type="submit">Search</button>
        </form>
        {this.state.opened && this.state.searching ? (
          <div className="preview">
            <header>
              <div className="info">
                <h2>{this.state.itemTitle}</h2>
                <h3>{this.state.itemAuthor}</h3>
              </div>
              <div className="back">
                <button className="back-button" onClick={this.goBack}>
                  Go Back
                </button>
              </div>
            </header>
            <div className="img-and-desc">
              <div className="img">
                <img src={this.state.itemImage} alt="" />
                <button type="submit">Add to currently reading</button>
                <button type="submit" onClick={this.addToFavorites}>Add to favorite books</button>
              </div>
              <div className="desc">
                <p>{this.state.itemDescription}</p>
              </div>
            </div>
          </div>
        ) : this.state.searching && !this.state.opened ? (
          <div className="search-results">
            {this.state.items.map((item, index) => {
              let volumeInfo = this.state.items[index]["volumeInfo"];
              return (
                <div
                  className="search-result"
                  onClick={this.handleClick}
                  id={`result${index}`}
                >
                  {volumeInfo.imageLinks !== undefined ? <img src={volumeInfo.imageLinks.thumbnail} alt="" /> : <p>No image available</p>}
                  {volumeInfo.title.length > 40 ? (
                    <div className="book-info">
                      <p className="book-title">{volumeInfo.title.substring(0, 40) + "..."}</p>
                      {volumeInfo.authors !== undefined ? <p className="book-author">by {volumeInfo.authors[0]}</p>: <p className="book-author">No author available</p>}
                      {/*<button type="submit">View description</button>*/}
                    </div>
                  ) : (
                    <div className="book-info">
                      <p className="book-title">{volumeInfo.title}</p>
                      {volumeInfo.authors !== undefined ? <p className="book-author">by {volumeInfo.authors[0]}</p>: <p className="book-author">No author available</p>}
                      {/*<button type="submit">View description</button>*/}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) 
        : 
        <div className="favorites">
          <ul>
            {this.state.favorites.map((item, index) => {
              return (
                <li key={index}>{this.state.favorites[index].id.title}</li>
              )
            })}
          </ul>
        </div>
        }
        {/*<button type="submit">+</button>*/}
      </div>
    );
  }
}

export default App;
