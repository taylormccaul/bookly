import React, { Component } from 'react'

export default class OneStar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            one: this.props.one,
        }
    }

    setRating = () => {
        this.props.setRating("one");
        this.setState({
            one: this.props.one
        })
        /*this.setState({
            one: !this.state.one
        });

        console.log(`One is ${this.state.one}`);*/
    }
    
    render() {
        return (
            this.state.one === false ?
            <span className="fa fa-star" onClick={this.setRating}></span>
            :
            <span className="fa fa-star checked" onClick={this.setRating}></span>
        )
    }
}
