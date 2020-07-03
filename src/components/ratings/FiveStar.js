import React, { Component } from 'react'

export default class FiveStar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            five: this.props.five
        }
    }

    setRating = () => {
        this.props.setRating("five");
        
        this.setState({
            five: this.props.five
        });

        /*console.log(`Five is ${this.state.five}`);*/
    }
    
    render() {
        return (
            this.state.five === false ?
            <span className="fa fa-star" onClick={this.setRating}></span>
            :
            <span className="fa fa-star checked" onClick={this.setRating}></span>
        )
    }
}
