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
import { auth } from './firebase.js';

const API_URL = `https://www.googleapis.com/books/v1/volumes`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      items: [],
      itemTitle: '',
      itemAuthor: '',
      itemImage: '',
      itemDescription: '',
      itemIndex: '',
      opened: false,
      searching: false,
      favorites: [],
      email: '',
      password: '',
      loggedIn: false,
      user: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.addToFavorites = this.addToFavorites.bind(this);

    this.goBack = this.goBack.bind(this);
    this.goHome = this.goHome.bind(this);

    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    this.logout = this.logout.bind(this);
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
      //console.log(this.state.items[0]["volumeInfo"].title);
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

  handleEmail(e) {
    this.setState({
      email: e.target.value
    });

    //console.log(this.state.email);
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value
    });

    //console.log(this.state.password);
  }

  /*signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }*/

  async handleSignupSubmit(e) {
    e.preventDefault();
    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
     /*const listRef = firebase.database().ref(`${this.state.user.uid}`);
      const favoritesList = [];
      listRef.push(favoritesList);
      firebase.database().ref(listRef[favoritesList]).push("HELLO");*/
      firebase.database().ref('users/' + this.state.user.uid).set({
        email: this.state.email,
        favoritesList: ["em"],
      });
    } catch (error) {
      console.error(error);
    }

    this.setState({
      email: '',
      password: '',
      loggedIn: true
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    /*try {
      await */firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((result) => {
        console.log(result.user.email);
      })
    //} catch (error) {
    //  console.error(error);
    //}

    this.setState({
      email: '',
      password: '',
      loggedIn: true
    });
  }

  logout() {
    firebase.auth().signOut();
    this.setState({
      loggedIn: false
    });
  }

  addToFavorites(e) {
    e.preventDefault();
    /*const favoritesRef = firebase.database().ref(`${this.state.user.uid}`);

    console.log(this.state.items[this.state.itemIndex]['volumeInfo']);*/
    const newFavorite = {
      title: this.state.itemTitle,
      author: this.state.itemAuthor,
      image: this.state.itemImage,
      id: Date.now(),
    }

    /*favoritesRef.push(newFavorite);*/

    //firebase.database().ref('/users/' + this.state.user.uid).once('value').then(function(snapshot) {
      //console.log(snapshot.favoritesList);
      /*const favoritesRef = firebase.database().ref(`${this.state.user.uid}`);
      const title = this.state.itemTitle;
      const author = this.state.itemAuthor;
      const image = this.state.itemImage;
      const id = Date.now();*/

      /*var usersRef = firebase.database().ref('users');
      var favoritess = usersRef.child(this.state.user.uid);
      var favoritesRefe = favoritess.child('favoritesList');
      var path = favoritesRefe.toString();*/

      firebase.database().ref(`/users/${this.state.user.uid}/favoritesList`).push(newFavorite);
      /*console.log(firebase.database().ref.child('/users/' + this.state.user.uid + 'favoritesList'));*//*.once('value')).then(function(snapshot) {
        const newFavorite = {
          title: title,
          author: author,
          image: image,
          id: id,
        }


        //console.log(firebase.database().ref('users/' + this.state.user.uid + "/favoritesList"));
        //favoritesRef.push(newFavorite);
  
        //snapshot.val().favoritesList.push(newFavorite);
        //console.log(snapshot.val().favoritesList)//Do something with your user data located in snapshot
      });*/

      /*const newFavorite = {
        title: this.state.itemTitle,
        author: this.state.itemAuthor,
        image: this.state.itemImage,
        id: Date.now(),
      }

      favoritesRef.push(newFavorite);*/
   // });
  }

  componentDidMount() {
    //const favoritesRef = firebase.database().ref('favorites');

    /*favoritesRef.on('value', (snapshot) => {
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
    });*/

    if (this.state.user != null) {
      firebase.database().ref('/users/' + this.state.user.uid).once('value').then(function(snapshot) {
        let favorites = snapshot.val().favoritesList;
        console.log(favorites);
      });
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
          loggedIn: true
        });
      }
    });
  }

  render() {
    return (
      <div>
        {!this.state.loggedIn ? 
          <form className="login-form">
            <input type="email" className="email-form" onChange={this.handleEmail} />
            <input type="password" className="password-form" onChange={this.handlePassword} />
            <button type="submit" className="signup-btn" onClick={this.handleSignupSubmit}>Sign up</button>
            <button type="submit" className="login-btn" onClick={this.handleLoginSubmit}>Log in</button>
          </form>
          :
          <div className="app">
          {/*<Router>
          <Link to="/home">Home</Link>
          <Switch>
            <Route path="/home">
              <Home userInput={this.state.userInput} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            </Route>
          </Switch>
          </Router>*/}
        <form onSubmit={this.handleSubmit} className="search-form">
          <h1 className="logo" onClick={this.goHome}>Bookly</h1>
          <input
            type="text"
            name="search-bar"
            className="search-bar"
            placeholder="Search for a book."
            value={this.state.userInput}
            onChange={this.handleChange}
          /> 
          <div>
            <button type="submit" className="search-btn">Search</button>
            <button type="submit" className="login-btn" onClick={this.logout}>Log out</button>
          </div>
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
        <div>
          <div className="favorites">
            {this.state.favorites.map((item, index) => {
              return (
                <div className="favorite-items">
                  <img src={this.state.favorites[index].id.image} alt="" />
                  <p>{this.state.favorites[index].id.title}</p>
                </div>
              )
            })}
          </div>
        </div>
        }
        {/*<button type="submit">+</button>*/}
        </div>
        }
      </div>
    );
  }
}

export default App;
