import React, { Component } from "react";

export default class SearchResults extends React.Component {
  handleClick = () => {
    this.props.handleClick();
  }

  render() {
    return (
      <div className="search-results">
        {
          this.props.items.map((item, index) => {
            let volumeInfo = this.props.items[index]["volumeInfo"];
            return (
              <div
                className="search-result"
                onClick={this.props.handleClick}
                id={`result${index}`}
                key={index}
              >
                {volumeInfo.imageLinks !== undefined ? (
                  <img src={volumeInfo.imageLinks.thumbnail} alt="" />
                ) : (
                  <p>No image available</p>
                )}
                <div className="book-info">
                  {volumeInfo.title.length > 40 ? (
                    <p className="book-title">
                      {volumeInfo.title.substring(0, 40) + "..."}
                    </p>
                  ) : (
                    <p className="book-title">{volumeInfo.title}</p>
                  )}
                  {volumeInfo.authors !== undefined ? (
                    <p className="book-author">by {volumeInfo.authors[0]}</p>
                  ) : (
                    <p className="book-author">No author available</p>
                  )}
                  {/*<button type="submit">View description</button>*/}
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}