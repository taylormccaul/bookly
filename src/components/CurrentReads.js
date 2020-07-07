import React, { Component } from "react";
import firebase from "../firebase.js";

import RatingsDisplay from "./RatingsDisplay";

export default class CurrentReads extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      currentReads: this.props.currentReads,
      userInput: this.props.userInput,
      user: this.props.user,
      shortened: this.props.shortened,
      bookIDs: [],
      rating: null,
      ratedYet: false,
      itemTitle: this.props.itemTitle,
      itemAuthor: this.props.itemAuthor,
      itemImage: this.props.itemImage,
    };

    this.deleteBook = this.deleteBook.bind(this);
  }

  deleteBook(book) {
    const bookRef = firebase
      .database()
      .ref(`/users/${this.state.user.uid}/currentReads/${book}`);

    bookRef.remove();
  }

  componentDidMount() {
    this._isMounted = true;

    const currentReadsRef = firebase
      .database()
      .ref(`/users/${this.state.user.uid}/currentReads`);

    currentReadsRef.on("value", (snapshot) => {
      let currentReads = snapshot.val();
      let newState = [];

      for (let currRead in currentReads) {
        newState.push({
          key: currRead,
          id: currentReads[currRead],
        });

        /*this.setState({
          bookIDs: [...newState],
        });*/
      }

      if (this._isMounted) {
        this.setState({
          currentReads: [...newState],
        });
      }
    });

    /*firebase
      .database()
      .ref(`/users/${this.state.user.uid}/currentReads`)
      .on("value", (snapshot) => {
        for (let item in snapshot.val()) {
          firebase
            .database()
            .ref(`/users/${this.state.user.uid}/currentReads/${item}`)
            .on("value", (snapshot) => {
              for (let index in this.state.bookIDs) {
                if (snapshot.val().title === this.state.bookIDs[index].id.title) {
                  this.setState({
                    ratedYet: true,
                    rating: snapshot.val().rating,
                  });
                } else {
                  console.log("-");
                }
              }
            });
        }
      });*/
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        {this.state.currentReads[0] === undefined &&
        this.state.userInput === "" ? (
          <div className="read-header">
            <h2>You have no current reads!</h2>
          </div>
        ) : this.state.shortened ? (
          <div className="current-reads-div">
            <div className="read-header">
              <h2>Your current reads</h2>
            </div>
            <div className="home-read">
              <div
                className="read-items"
                key={Math.floor(Math.random() * 100) + 10}
                onClick={() => this.deleteBook(this.state.currentReads[0].key)}
              >
                <p className="book-title">
                  {this.state.currentReads[0].id.title}
                </p>
                <img src={this.state.currentReads[0].id.image} alt="" />
                <p className="book-author">
                  {this.state.currentReads[0].id.author[0]}
                </p>
                <RatingsDisplay
                  rating={this.state.currentReads[0].id.rating}
                  ratedYet={this.state.currentReads[0].id.ratedYet}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="current-reads-div">
            <div className="read-header">
              <h2>Your current reads</h2>
              <button type="button">View all</button>
            </div>
            <div className="shelves-read">
              {this.state.currentReads.map((item, index) => {
                return (
                  <div
                    className="read-items"
                    key={index}
                    onClick={() =>
                      this.deleteBook(this.state.currentReads[index].key)
                    }
                  >
                    <p className="book-title">
                      {this.state.currentReads[index].id.title}
                    </p>
                    <img src={this.state.currentReads[index].id.image} alt="" />
                    <p className="book-author">
                      {this.state.currentReads[index].id.author[0]}
                    </p>
                    <RatingsDisplay
                      rating={this.state.currentReads[index].id.rating}
                      ratedYet={this.state.currentReads[index].id.ratedYet}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
