import React, { Component } from 'react';

class Logo extends Component {
    render() {
        return (
            <h1 className="logo" onClick={this.props.goHome}>Bookly</h1>
        )
    }
}

export default Logo;