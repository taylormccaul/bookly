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
import Preview from "./components/Preview";
import SearchResults from "./components/SearchResults";
//import SearchBar from "./components/SearchBar";

import ReadList from "./components/ReadList";
import CurrentReads from "./components/CurrentReads";

import EmailForm from "./components/EmailForm";
import PasswordForm from "./components/PasswordForm";

import SignupButton from "./components/SignupButton";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

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
      read: [],
      email: "",
      password: "",
      loggedIn: false,
      user: null,
      IDs: [],
      currentReads: [],
      shortened: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);

    this.goBack = this.goBack.bind(this);
    this.goHome = this.goHome.bind(this);

    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

    this.logout = this.logout.bind(this);

    //this.addToList = this.addToList.bind(this);
    //this.setRating = this.setRating.bind(this);
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

  async handleSignupSubmit() {
    //e.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((result) => {
          this.setState({
            user: result.user,
            loggedIn: true,
          });
        });
      firebase
        .database()
        .ref("users/" + this.state.user.uid)
        .set({
          email: this.state.email,
          readList: [],
        });

      this.set.state({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleLoginSubmit() {
    //e.preventDefault();
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

  /*addToList(ref) {
    //e.preventDefault();
    this.setState({
      ratingNow: true,
    });

    console.log(this.state.rating);

    const newItem = {
      title: this.state.itemTitle,
      author: this.state.itemAuthor,
      image: this.state.itemImage,
      id: Date.now(),
      rating: this.state.rating,
    };

    ref.push(newItem);

    /*const readRef = firebase
      .database()
      .ref(`/users/${this.state.user.uid}/readList`);

    const newPastRead = {
      title: this.state.itemTitle,
      author: this.state.itemAuthor,
      image: this.state.itemImage,
      id: Date.now(),
    };

    readRef.push(newPastRead);*/
  //}*/

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({
          user: user,
          loggedIn: true,
        });
        console.log(user.email);

        const readRef = firebase
          .database()
          .ref(`/users/${this.state.user.uid}/readList`);

        const currentReadsRef = firebase
          .database()
          .ref(`/users/${this.state.user.uid}/currentReads`);

        readRef.on("value", (snapshot) => {
          let readList = snapshot.val();
          let newState = [];
          for (let read in readList) {
            newState.push({
              key: read,
              id: readList[read],
            });
          }

          this.setState({
            read: [...newState],
          });
        });

        currentReadsRef.on("value", (snapshot) => {
          let currentReadsList = snapshot.val();
          let newState = [];
          for (let currRead in currentReadsList) {
            newState.push({
              key: currRead,
              id: currentReadsList[currRead],
            });
          }

          this.setState({
            currentReads: [...newState],
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
            <EmailForm handleEmail={this.handleEmail} />
            <PasswordForm handlePassword={this.handlePassword} />
            <SignupButton handleSignupSubmit={this.handleSignupSubmit} />
            <LoginButton handleLoginSubmit={this.handleLoginSubmit} />
          </form>
        ) : (
          <div className="app" onLoad={this.updateRead}>
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
                <LogoutButton logout={this.logout} />
              </div>
            </form>
            {this.state.opened && this.state.searching ? (
              <Preview
                itemTitle={this.state.itemTitle}
                itemAuthor={this.state.itemAuthor}
                itemImage={this.state.itemImage}
                desc={this.state.itemDescription}
                user={this.state.user}
                goBack={this.goBack}
                addToList={this.addToList}
                items={this.state.items}
              />
            ) : this.state.ratingNow ? (
              <h1>HELLO</h1>
            ) : this.state.searching && !this.state.opened ? (
              <SearchResults
                items={this.state.items}
                handleClick={this.handleClick}
              />
            ) : (
              <div className="bookshelves">
                <h2>Your bookshelves</h2>
                <button type="button">View all</button>
                <div className="list-div">
                  <ReadList
                    read={this.state.read}
                    user={this.state.user}
                    userInput={this.state.userInput}
                    shortened={this.state.shortened}
                  />
                  <CurrentReads
                    currentReads={this.state.currentReads}
                    user={this.state.user}
                    userInput={this.state.userInput}
                    shortened={this.state.shortened}
                  />
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
