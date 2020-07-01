import React, { Component } from 'react';
import Logo from './Logo';
import axios from "axios";

const API_URL = `https://www.googleapis.com/books/v1/volumes`;

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e.target.value);
        console.log("HELLO")
        /*this.setState({
            userInput: e.target.value,
        });*/
    }
    
    handleSubmit(e) {
        this.props.handleSubmit(e.target.value);
        /*e.preventDefault();
    
        axios.get(`${API_URL}?q=${this.state.userInput}&maxResults=15`)
            .then((data) => {
            this.setState({
                items: [...data.data.items],
                opened: false,
            });
            console.log(this.state.items[0]["volumeInfo"].title);
        });*/
    }
    
    render() {
        const search = this.props.search;
        return (
            <form onSubmit={this.props.handleSubmit}>
                <Logo />
                <input
                    type="text"
                    name="search-bar"
                    className="search-bar"
                    placeholder="Search for a book."
                    value={search}
                    onChange={this.props.handleChange}
                />
                <button type="submit">Search</button>
            </form>
        )
    }
}

export default Home;