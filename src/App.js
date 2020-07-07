import React, { Component } from "react";
import "./App.css";
import axios from "axios";

//import Logo from "./components/Logo";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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

const API_URL = `https://www.googleapis.com/books/v1/volumes`; /*}
    </div>
  );
}*/

/*function Home() {
  return (
    <div>
      <h1 className="logo" onClick={this.goHome}>
        Bookly
      </h1>
      <Router>
        <Link to="/home">HOME</Link>
        <Switch>
          <Route path="/home">
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
          </Route>
        </Switch>
      </Router>
      {/*this.state.opened && this.state.searching ? (
              <Preview
                itemTitle={this.state.itemTitle}
                itemAuthor={this.state.itemAuthor}
                itemImage={this.state.itemImage}
                desc={this.state.itemDescription}
                user={this.state.user}
                goBack={this.goBack}
                addToList={this.addToList}
                items={this.state.items}
            />*/ class App extends Component {
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
      currentPage: "",
      rating: null,
      ratedYet: false,
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
    this.goToShelves = this.goToShelves.bind(this);

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

  goToShelves() {
    this.setState({
      currentPage: window.location.href,
      shortened: false,
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({
          user: user,
          loggedIn: true,
          currentPage: window.location.href,
        });

        //console.log(user.email);

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

        /*firebase
          .database()
          .ref(`/users/${this.state.user.uid}/readList`)
          .on("value", (snapshot) => {
            for (let item in snapshot.val()) {
              firebase
                .database()
                .ref(`/users/${this.state.user.uid}/readList/${item}`)
                .on("value", (snapshot) => {
                  if (snapshot.val().title === this.state.itemTitle) {
                    this.setState({
                      ratedYet: true,
                      rating: snapshot.val().rating,
                    });
                  } else {
                    console.log("UNEQUAL");
                  }
                });
            }
          });*/
      }
    });
  }

  render() {
    return (
      <div>
        {
          !this.state.loggedIn ? (
            <form className="login-form">
              <EmailForm handleEmail={this.handleEmail} />
              <PasswordForm handlePassword={this.handlePassword} />
              <SignupButton handleSignupSubmit={this.handleSignupSubmit} />
              <LoginButton handleLoginSubmit={this.handleLoginSubmit} />
            </form>
          ) : window.location.href.includes("home") ? (
            /*<div className="app" onLoad={this.updateRead}>*/
            <div>
              <h1 className="logo" onClick={this.goHome}>
                Bookly
              </h1>
              <Router>
                {/*<Link to="/home">HOME</Link>*/}
                <Switch>
                  <Route path="/home">
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
                        {/*console.log(window.location.href.includes("search?q="))*/}
                        <button type="submit" className="search-btn">
                          {/*<Link
                          to={`/search?q=${this.state.userInput}`}
                          className="search-link"
                          onClick={this.handleSubmit}
                        >*/}
                          Search
                          {/*</Link>*/}
                        </button>
                        <LogoutButton logout={this.logout} />
                      </div>
                    </form>
                    {/*!this.state.opened && !this.state.searching ? (
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
                  ) : (
                    console.log("Not opened or searching")
                  )*/}
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
                    ) : !this.state.opened && this.state.searching ? (
                      <SearchResults
                        items={this.state.items}
                        handleClick={this.handleClick}
                      />
                    ) : (
                      <div className="bookshelves">
                        <h2>Your bookshelves</h2>
                        <Link to="/shelves" className="shelves-link">
                          <button type="button" onClick={this.goToShelves}>
                            View all
                          </button>
                        </Link>
                        <div className="home-list-div">
                          <ReadList
                            read={this.state.read}
                            user={this.state.user}
                            userInput={this.state.userInput}
                            shortened={this.state.shortened}
                            itemTitle={this.state.itemTitle}
                            itemAuthor={this.state.itemAuthor}
                            itemImage={this.state.itemImage}
                          />
                          <CurrentReads
                            currentReads={this.state.currentReads}
                            user={this.state.user}
                            userInput={this.state.userInput}
                            shortened={this.state.shortened}
                            itemTitle={this.state.itemTitle}
                            itemAuthor={this.state.itemAuthor}
                            itemImage={this.state.itemImage}
                          />
                        </div>
                      </div>
                    )}
                  </Route>
                </Switch>
              </Router>
            </div>
          ) : window.location.href.includes("shelves") ? (
            <div className="bookshelves">
              <h2>Your bookshelves</h2>
              <div className="shelves-list-div">
                <ReadList
                  read={this.state.read}
                  user={this.state.user}
                  userInput={this.state.userInput}
                  shortened={false}
                  itemTitle={this.state.itemTitle}
                  itemAuthor={this.state.itemAuthor}
                  itemImage={this.state.itemImage}
                />
                <CurrentReads
                  currentReads={this.state.currentReads}
                  user={this.state.user}
                  userInput={this.state.userInput}
                  shortened={false}
                  itemTitle={this.state.itemTitle}
                  itemAuthor={this.state.itemAuthor}
                  itemImage={this.state.itemImage}
                />
              </div>
            </div>
          ) : (
            console.log("Not searching")
          )
          /*(!this.state.opened && this.state.searching) ||
          window.location.href.includes("search?q=") ? (
          <SearchResults
            items={this.state.items}
            handleClick={this.handleClick}
          />
        ) : (
          console.log("Not searching")
        )*/
        }
      </div>
    );
  }
  /*:  } this.state.ratingNow ? ( <h1>HELLO</h1>) : this.state.searching && !this.state.opened ? (
              <SearchResults
                items={this.state.items}
                handleClick={this.handleClick}
              />) : (console.log("Not searching, not opened")) closingbrace*/
  /*: !window.location.href.includes("home") ?
                <Router>
                <div className="bookshelves">
                <h2>Your bookshelves</h2>
                  <Link to="/shelves" className="shelves-link">
                    <button type="button">View all</button>
                  </Link>
                  {/*<Link to="/home">Home</Link>*/
} /*</div>
                    ) : /*console.log("HELLO")*/ /*</Route>
                  </Switch>
                  </div>
                </Router>
            /*<button type="submit">+</button>*/ //} //}
/*<Switch>
                    <Route path="/shelves">
                      <ReadList
                        read={this.state.read}
                        user={this.state.user}
                        userInput={this.state.userInput}
                        shortened={false}
                      />
                      <CurrentReads
                        currentReads={this.state.currentReads}
                        user={this.state.user}
                        userInput={this.state.userInput}
                        shortened={false}
                      />
                      {/*<Home
                        userInput={this.state.userInput}
                        onSubmit={this.handleSubmit}
                        onChange={this.handleChange}
                      />*/ export default App;
