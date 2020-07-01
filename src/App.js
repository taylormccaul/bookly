import React, { Component } from "react";
import "./App.css";
import axios from "axios";
//import Logo from "./components/Logo";
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";*/
import firebase from "./firebase.js";
import Preview from "./components/Preview.js";
import SearchResults from "./components/SearchResults";

const API_URL = `https://www.googleapis.com/books/v1/volumes`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      items: [],
      itemTitle: "",
      itemAuthor: "",
      itemImage: "",
      itemDescription: "",
      itemIndex: "",
      opened: false,
      searching: false,
      favorites: [],
      email: "",
      password: "",
      loggedIn: false,
      user: null,
      IDs: [],
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

    axios
      .get(`${API_URL}?q=${this.state.userInput}&maxResults=15`)
      .then((data) => {
        this.setState({
          items: [...data.data.items],
          opened: false,
          searching: true,
        });
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
      itemIndex: e.currentTarget.id.substring(6, 7),
    });
  }

  goBack = () => {
    this.setState({
      opened: false,
    });
  };

  goHome() {
    this.setState({
      opened: false,
      searching: false,
      userInput: "",
    });
  }

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  async handleSignupSubmit(e) {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((result) => {
          this.setState({
            email: "",
            password: "",
            user: result.user,
            loggedIn: true,
          });
        });
      firebase
        .database()
        .ref("users/" + this.state.user.uid)
        .set({
          email: this.state.email,
          favoritesList: [],
        });
    } catch (error) {
      console.error(error);
    }
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        this.setState({
          email: "",
          password: "",
          user: result.user,
          loggedIn: true,
        });
      });
  }

  logout() {
    firebase.auth().signOut();
    this.setState({
      user: null,
      loggedIn: false,
    });
  }

  addToFavorites(e) {
    e.preventDefault();

    const favoritesRef = firebase
      .database()
      .ref(`/users/${this.state.user.uid}/favoritesList`);

    const newFavorite = {
      title: this.state.itemTitle,
      author: this.state.itemAuthor,
      image: this.state.itemImage,
      id: Date.now(),
    };

    favoritesRef.push(newFavorite);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({
          user: user,
          loggedIn: true,
        });

        const favoritesRef = firebase
          .database()
          .ref("users/" + this.state.user.uid + "/favoritesList");

        favoritesRef.on("value", (snapshot) => {
          let favoritesList = snapshot.val();
          let newState = [];
          for (let favorite in favoritesList) {
            newState.push({
              key: favorite,
              id: favoritesList[favorite],
            });
          }

          this.setState({
            favorites: [...newState],
          });
        });
      }
    });
  }

  render() {
    return (
      <div>
        {!this.state.loggedIn ? (
          <form className="login-form">
            <input
              type="email"
              className="email-form"
              onChange={this.handleEmail}
            />
            <input
              type="password"
              className="password-form"
              onChange={this.handlePassword}
            />
            <button
              type="submit"
              className="signup-btn"
              onClick={this.handleSignupSubmit}
            >
              Sign up
            </button>
            <button
              type="submit"
              className="login-btn"
              onClick={this.handleLoginSubmit}
            >
              Log in
            </button>
          </form>
        ) : (
          <div className="app" onLoad={this.updateFavorites}>
            {/*<Router>
          <Link to="/home">Home</Link>
          <Switch>
            <Route path="/home">
              <Home userInput={this.state.userInput} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            </Route>
          </Switch>
          </Router>*/}
            <h1 className="logo" onClick={this.goHome}>
              Bookly
            </h1>
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
                <button
                  type="button"
                  className="login-btn"
                  onClick={this.logout}
                >
                  Log out
                </button>
              </div>
            </form>
            {this.state.opened && this.state.searching ? (
              <Preview
                itemTitle={this.state.itemTitle}
                itemAuthor={this.state.itemAuthor}
                itemImage={this.state.itemImage}
                desc={this.state.itemDescription}
                goBack={this.goBack}
                addToFavorites={this.addToFavorites}
              />
            ) : this.state.searching && !this.state.opened ? (
              <SearchResults items={this.state.items} handleClick={this.handleClick}/>
            ) : (
              <div>
                <h2>Your favorite books</h2>
                <div className="favorites">
                  {this.state.favorites.map((item, index) => {
                    return (
                      <div className="favorite-items" key={index}>
                        <p className="book-title">
                          {this.state.favorites[index].id.title}
                        </p>
                        <img
                          src={this.state.favorites[index].id.image}
                          alt=""
                        />
                        <p className="book-author">
                          {this.state.favorites[index].id.author[0]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/*<button type="submit">+</button>*/}
          </div>
        )}
      </div>
    );
  }
}

export default App;