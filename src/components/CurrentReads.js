import React, { Component } from "react";
import firebase from "../firebase.js";

export default class CurrentReads extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      currentReads: this.props.currentReads,
      userInput: this.props.userInput,
      user: this.props.user,
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
      }

      if (this._isMounted) {
        this.setState({
          currentReads: [...newState],
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        {this.state.currentReads[0] === undefined &&
        this.state.userInput === "" ? (
          <div className="favorites-header">
            <h2>You have no current reads!</h2>
          </div>
        ) : (
          <div className="favorites-header">
            <h2>Your current reads</h2>
            <button type="button">View all</button>
          </div>
        )}
        <div className="favorites">
          {this.state.currentReads.map((item, index) => {
            return (
              <div
                className="favorite-items"
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
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}