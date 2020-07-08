import React from "react";
import firebase from "../firebase.js";

import RatingsDisplay from "./RatingsDisplay";

class ReadList extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      read: this.props.read,
      userInput: this.props.userInput,
      user: this.props.user,
      shortened: this.props.shortened,
      bookIDs: [],
      rating: 1,
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
      .ref(`/users/${this.state.user.uid}/shelves/readList/${book}`);

    bookRef.remove();
  }

  componentDidMount() {
    this._isMounted = true;

    const readRef = firebase
      .database()
      .ref(`/users/${this.state.user.uid}/shelves/readList`);

    readRef.on("value", (snapshot) => {
      let readList = snapshot.val();
      let newState = [];

      for (let read in readList) {
        newState.push({
          key: read,
          id: readList[read],
        });
      }

      /*this.setState({
        bookIDs: [...newState],
      });*/

      if (this._isMounted) {
        this.setState({
          read: [...newState],
        });
      }
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
              for (let index in this.state.bookIDs) {
                console.log(snapshot.val())
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
        {this.state.read[0] === undefined && this.state.userInput === "" ? (
          <div className="read-header">
            <h2>You have no past reads!</h2>
          </div>
        ) : this.state.shortened === true ? (
          <div className="past-reads-div">
            <div className="read-header">
              <h2>Your past reads</h2>
            </div>
            <div className="home-read">
              <div
                className="read-items"
                key={Math.floor(Math.random() * 100) + 5}
                onClick={() => this.deleteBook(this.state.read[0].key)}
              >
                <p className="book-title">{this.state.read[0].id.title}</p>
                <img src={this.state.read[0].id.image} alt="" />
                <p className="book-author">{this.state.read[0].id.author[0]}</p>
                <RatingsDisplay
                  rating={this.state.read[0].id.rating}
                  ratedYet={this.state.read[0].id.ratedYet}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={"chosen-shelf-display" /*"past-reads-div"*/}>
            <div className="read-header">
              <h2>Your past reads</h2>
              {/*<button type="button">View all</button>*/}
            </div>
            <div className="shelf-display">
              {this.state.read.map((item, index) => {
                //console.log(this.state.read[index]);
                var periodStop = this.state.read[index].id.description.indexOf(
                  ".",
                  250
                );

                var questionStop = this.state.read[
                  index
                ].id.description.indexOf("?", 250);

                var exclamationStop = this.state.read[
                  index
                ].id.description.indexOf("!", 250);

                /*var questionStop = this.state.read[
                  index
                ].id.description.substring(
                  0,
                  this.state.read[index].id.description.indexOf("?", 250) + 1
                );*/

                return (
                  <div
                    className="book-display"
                    key={index}
                    onClick={() => this.deleteBook(this.state.read[index].key)}
                  >
                    <div className="read-items">
                      <p className="book-title">
                        {this.state.read[index].id.title}
                      </p>
                      <img src={this.state.read[index].id.image} alt="" />
                      <p className="book-author">
                        {this.state.read[index].id.author[0]}
                      </p>
                      <RatingsDisplay
                        rating={this.state.read[index].id.rating}
                        ratedYet={this.state.read[index].id.ratedYet}
                      />
                    </div>
                    <div className="book-info">
                      {/*console.log(/\.|!|\?/g.exec(this.state.read[index].id.description).index)*/}
                      {periodStop < questionStop &&
                      periodStop < exclamationStop || questionStop === -1 || exclamationStop === -1 ? (
                        <p className="book-desc">
                          {this.state.read[index].id.description.substring(
                            0,
                            periodStop + 1
                          )}
                        </p>
                      ) : questionStop < periodStop &&
                        questionStop < exclamationStop || periodStop === -1 || exclamationStop === -1 ? (
                        <p className="book-desc">
                          {this.state.read[index].id.description.substring(
                            0,
                            questionStop + 1
                          )}
                        </p>
                      ) : exclamationStop < periodStop &&
                        exclamationStop < questionStop || periodStop === -1 || questionStop === -1 ? (
                        <p className="book-desc">
                          {this.state.read[index].id.description.substring(
                            0,
                            exclamationStop + 1
                          )}
                        </p>
                      ) : (
                        <p className="book-desc">No description</p>
                      )}
                    </div>
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

export default ReadList;
