import React from "react";

class Preview extends React.Component {
  goBack = () => {
    this.props.goBack();
  };

  addToFavorites = (e) => {
    this.props.addToFavorites(e);
  };

  render() {
    return (
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
            <button type="submit">Add to currently reading</button>
            <button type="submit" onClick={this.addToFavorites}>
              Add to favorite books
            </button>
          </div>
          <div className="desc">
            <p>{this.props.desc}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;