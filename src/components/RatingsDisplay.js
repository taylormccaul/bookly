import React, { Component } from "react";

export default class RatingsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.rating,
      ratedYet: this.props.ratedYet,
    };
  }

  render() {
    return (
      <div>
        {this.state.rating === 1 && this.state.ratedYet ? (
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
        ) : this.state.rating === null ? (
            <p>Not yet rated</p>
        ) : (
          console.log(this.state.rating)
        )}
      </div>
    );
  }
}
