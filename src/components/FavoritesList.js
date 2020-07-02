import React from "react";
import firebase from '../firebase.js';

class FavoritesList extends React.Component {
    _isMounted = false;

  constructor(props) {
      super(props);
      this.state = {
        favorites: this.props.favorites,
        userInput: this.props.userInput,
        user: this.props.user
      }

      this.deleteBook = this.deleteBook.bind(this);
  }

  deleteBook(book) {
    const bookRef = firebase
      .database()
      .ref(`/users/${this.state.user.uid}/favoritesList/${book}`);

    bookRef.remove();
  }

  componentDidMount() {
    this._isMounted = true;
    const favoritesRef = firebase.database().ref(`/users/${this.state.user.uid}/favoritesList`);

    favoritesRef.on("value", (snapshot) => {
        let favoritesList = snapshot.val()
        let newState = [];
        
        for (let favorite in favoritesList) {
            newState.push({
                key: favorite,
                id: favoritesList[favorite]
            });
        }

        if (this._isMounted) {
            this.setState({
                favorites: [...newState]
            });
        }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        {this.state.favorites[0] === undefined && this.state.userInput === "" ? (
          <div className="favorites-header">
              <h2>You have no favorites!</h2> 
          </div>
        ) : (
          <div className="favorites-header">
            <h2>Your favorite books</h2>
            <button type="button">View all</button>
          </div>
        )}
        <div className="favorites">
          {this.state.favorites.map((item, index) => {
            return (
              <div
                className="favorite-items"
                key={index}
                onClick={() => this.deleteBook(this.state.favorites[index].key)}
              >
                <p className="book-title">
                  {this.state.favorites[index].id.title}
                </p>
                <img src={this.state.favorites[index].id.image} alt="" />
                <p className="book-author">
                  {this.state.favorites[index].id.author[0]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default FavoritesList;