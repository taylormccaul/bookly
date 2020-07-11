import React, { Component } from "react";
import firebase from "../firebase.js";

import RatingsDisplay from "./RatingsDisplay";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      rating: null,
      ratingNow: false,
      ratedYet: false,
      doneRating: true,
      itemTitle: this.props.itemTitle,
      itemAuthor: this.props.itemAuthor,
      itemImage: this.props.itemImage,
      itemDesc: this.props.itemDesc,
      items: this.props.items,
      shelvesList: this.props.shelvesList,
    };

    this.selectShelf = this.selectShelf.bind(this);
  }

  goBack = () => {
    this.props.goBack();
  };

  addToList = (ref) => {
    //this.props.startRating();

    if (this._isMounted === true) {
      //e.preventDefault();
      if (
        ref.path.pieces_[3] ===
        firebase
          .database()
          .ref(`/users/${this.state.user.uid}/shelves/read-list`).path
          .pieces_[3]
      ) {
        this.setState({
          ratingNow: true,
          doneRating: false,
        });
      } else {
        var newDate = new Date(Date.now());

        var pmOrAm = "";
        var minutes = "";

        if (newDate.getHours() > 12 && newDate.getHours() < 24) {
          pmOrAm = "pm";
        } else {
          pmOrAm = "am";
        }

        if (newDate.getMinutes() < 10) {
          minutes = `0${newDate.getMinutes()}`;
        } else {
          minutes = newDate.getMinutes();
        }

        var dateAdded = `${days[newDate.getDay()]}, ${
          months[newDate.getMonth()]
        } ${newDate.getDate()}, ${newDate.getFullYear()}, ${
          newDate.getHours() - 12
        }:${minutes}${pmOrAm}`;
        //console.log(ref.path.pieces_);
        const newItem = {
          title: this.state.itemTitle,
          author: this.state.itemAuthor,
          image: this.state.itemImage,
          description: this.state.itemDesc,
          rating: this.state.rating,
          ratedYet: this.state.ratedYet,
          dateAdded: dateAdded,
          id: Date.now(),
        };

        ref.push(newItem);
      }

      /*const readRef = firebase
          .database()
          .ref(`/users/${this.state.user.uid}/read-list`);
    
        const newPastRead = {
          title: this.state.itemTitle,
          author: this.state.itemAuthor,
          image: this.state.itemImage,
          id: Date.now(),
        };
    
        readRef.push(newPastRead);*/
    }
  };

  componentDidMount() {
    this._isMounted = true;

    firebase
      .database()
      .ref(`/users/${this.state.user.uid}/shelves/read-list`)
      .on("value", (snapshot) => {
        for (let item in snapshot.val()) {
          firebase
            .database()
            .ref(`/users/${this.state.user.uid}/shelves/read-list/${item}`)
            .on("value", (snapshot) => {
              if (snapshot.val() != null) {
                if (snapshot.val().title === this.state.itemTitle) {
                  this.setState({
                    ratedYet: true,
                    rating: snapshot.val().rating,
                  });
                } else {
                  console.log("UNEQUAL");
                }
              }
            });
        }
      });

    /*firebase
      .database()
      .ref(`/users/${this.state.user.uid}/shelves`)
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          this.setState({
            shelvesList: Object.assign(
              this.state.shelvesList,
              Object.keys(snapshot.val())
            ),
          });
        }
      });

    if (this.state.shelvesList !== null) {
      console.log(this.state.shelvesList);
    }*/
  }

  finishRating = (ref) => {
    console.log(
      `Book '${this.props.itemTitle}' has been rated ${this.state.rating} stars.`
    );

    var newDate = new Date(Date.now());

    var pmOrAm = "";
    var minutes = "";

    if (newDate.getHours() > 12 && newDate.getHours() < 24) {
      pmOrAm = "pm";
    } else {
      pmOrAm = "am";
    }

    if (newDate.getMinutes() < 10) {
      minutes = `0${newDate.getMinutes()}`;
    } else {
      minutes = newDate.getMinutes();
    }

    var dateAdded = `${days[newDate.getDay()]}, ${
      months[newDate.getMonth()]
    } ${newDate.getDate()}, ${newDate.getFullYear()}, ${
      newDate.getHours() - 12
    }:${minutes}${pmOrAm}`;

    const newItem = {
      title: this.state.itemTitle,
      author: this.state.itemAuthor,
      image: this.state.itemImage,
      description: this.state.itemDesc,
      rating: this.state.rating,
      ratedYet: true,
      dateAdded: dateAdded,
      id: Date.now(),
    };

    ref.push(newItem);

    this.setState({
      ratingNow: false,
      doneRating: true,
    });
  };

  setRating = (value) => {
    switch (value) {
      case "one":
        this.setState({
          one: !this.state.one,
          rating: 1,
        });

        //console.log(this.state.one);

        if (this.state.one === true) {
          this.setState({
            two: false,
            three: false,
            four: false,
            five: false,
          });
        }

        if (this.state.one === false) {
          this.setState({
            two: false,
            three: false,
            four: false,
            five: false,
          });
        }
        break;
      case "two":
        this.setState({
          one: !this.state.one,
          two: !this.state.two,
          rating: 2,
        });

        if (this.state.two === true) {
          this.setState({
            three: false,
            four: false,
            five: false,
          });
        }

        if (this.state.two === false) {
          this.setState({
            one: true,
            two: true,
            three: false,
            four: false,
            five: false,
          });
        }
        break;
      case "three":
        this.setState({
          one: !this.state.one,
          two: !this.state.two,
          three: !this.state.three,
          rating: 3,
        });

        if (this.state.three === true) {
          this.setState({
            four: false,
            five: false,
          });
        }

        if (this.state.three === false) {
          this.setState({
            one: true,
            two: true,
            three: true,
            four: false,
            five: false,
          });
        }
        break;
      case "four":
        this.setState({
          one: !this.state.one,
          two: !this.state.two,
          three: !this.state.three,
          four: !this.state.four,
          rating: 4,
        });

        if (this.state.four === true) {
          this.setState({
            five: false,
          });
        }

        if (this.state.four === false) {
          this.setState({
            one: true,
            two: true,
            three: true,
            four: true,
            five: false,
          });
        }

        break;
      case "five":
        this.setState({
          one: !this.state.one,
          two: !this.state.two,
          three: !this.state.three,
          four: !this.state.four,
          five: !this.state.five,
          rating: 5,
        });

        if (this.state.five === false) {
          this.setState({
            one: true,
            two: true,
            three: true,
            four: true,
            five: true,
          });
        }
        break;
      default:
        console.log("HELLO");
        break;
    }
  };

  selectShelf(e) {
    console.log(e.target.value);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    //console.log(this.state.ratingNow);
    /*for (let i = 0; i < 5; i++) {
      
    }*/
    return !this.state.ratingNow && this.state.doneRating ? (
      <div className="preview">
        <header>
          <div className="info">
            <h2>{this.props.itemTitle}</h2>
            <h3>by {this.props.itemAuthor}</h3>
          </div>
          <div className="back">
            <button className="back-button" onClick={this.goBack}>
              Go Back
            </button>
          </div>
        </header>
        <div className="img-and-desc">
          <div className="img">
            <img src={this.props.itemImage} alt="" />
            <RatingsDisplay
              rating={this.state.rating}
              ratedYet={this.state.ratedYet}
            />
            {/*this.state.rating === 1 && this.state.ratedYet ? (
              <div className="star-ratings">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>
            ) : this.state.rating === 2 && this.state.ratedYet ? (
              <div className="star-ratings">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>
            ) : this.state.rating === 3 && this.state.ratedYet ? (
              <div className="star-ratings">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>
            ) : this.state.rating === 4 && this.state.ratedYet ? (
              <div className="star-ratings">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
              </div>
            ) : this.state.rating === 5 && this.state.ratedYet ? (
              <div className="star-ratings">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </div>
            ) : this.state.ratedYet === false ? (
              <p>Not yet rated</p>
            ) : (
              console.log("ERROR")
            )*/}
            <select name="shelves" id="bookshelves" onChange={this.selectShelf}>
              {this.state.shelvesList.map((item, index) => {
                return (
                  <option value={this.state.shelvesList[index]} key={`shelf-${this.state.shelvesList[index]}`}>
                    {this.state.shelvesList[index]}
                  </option>
                );
              })}
              <option value="add-new">Add new shelf</option>
            </select>
            <button
              type="button"
              onClick={() =>
                this.addToList(
                  firebase
                    .database()
                    .ref(`/users/${this.state.user.uid}/shelves/current-reads`)
                )
              }
            >
              Add to currently reading
            </button>
            <button
              type="button"
              onClick={() =>
                this.addToList(
                  firebase
                    .database()
                    .ref(`/users/${this.state.user.uid}/shelves/read-list`)
                )
              }
            >
              Add to past reads
            </button>
          </div>
          <div className="desc">
            <p>{this.state.itemDesc}</p>
          </div>
        </div>
      </div>
    ) : (
      <div className="ratings-div">
        <h3>
          What rating would you give
          <span className="book-rating-title"> {this.state.itemTitle}</span>?
        </h3>

        {this.state.one === false ? (
          <span
            className="fa fa-star"
            onClick={() => this.setRating("one")}
          ></span>
        ) : (
          <span
            className="fa fa-star checked"
            onClick={() => this.setRating("one")}
          ></span>
        )}

        {this.state.two === false ? (
          <span
            className="fa fa-star"
            onClick={() => this.setRating("two")}
          ></span>
        ) : (
          <span
            className="fa fa-star checked"
            onClick={() => this.setRating("two")}
          ></span>
        )}

        {this.state.three === false ? (
          <span
            className="fa fa-star"
            onClick={() => this.setRating("three")}
          ></span>
        ) : (
          <span
            className="fa fa-star checked"
            onClick={() => this.setRating("three")}
          ></span>
        )}

        {this.state.four === false ? (
          <span
            className="fa fa-star"
            onClick={() => this.setRating("four")}
          ></span>
        ) : (
          <span
            className="fa fa-star checked"
            onClick={() => this.setRating("four")}
          ></span>
        )}

        {this.state.five === false ? (
          <span
            className="fa fa-star"
            onClick={() => this.setRating("five")}
          ></span>
        ) : (
          <span
            className="fa fa-star checked"
            onClick={() => this.setRating("five")}
          ></span>
        )}

        <button
          onClick={() =>
            this.finishRating(
              firebase
                .database()
                .ref(`/users/${this.state.user.uid}/shelves/read-list`)
            )
          }
        >
          Done
        </button>

        {/*<OneStar one={this.state.one} setRating={this.setRating} />
        <TwoStar two={this.state.two} setRating={this.setRating} />
        <ThreeStar three={this.state.three} setRating={this.setRating} />
        <FourStar four={this.state.four} setRating={this.setRating} />
        <FiveStar five={this.state.five} setRating={this.setRating} />*/}
        {/*<span class="fa fa-star checked" onClick={this.rateOne}></span>
        <span class="fa fa-star checked" onClick={this.rateTwo}></span>
        <span class="fa fa-star checked" onClick={this.rateThree}></span>
        <span class="fa fa-star" onClick={}></span>
    <span class="fa fa-star"></span>*/}
      </div>
    );
  }
}
