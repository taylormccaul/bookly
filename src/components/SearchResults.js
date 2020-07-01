import React from "react";

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: this.props.items
    }
  }

  handleClick = () => {
    this.props.handleClick();
  }

  render() {
    return (
      <div className="search-results">
        {
          this.state.items.map((item, index) => {
            let volumeInfo = this.state.items[index]["volumeInfo"];
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

export default SearchResults;