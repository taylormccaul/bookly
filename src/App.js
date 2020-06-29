import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {

  }

  render() {
    return (
      <div>
        <header>
          <h1>Habit Tracker</h1>
          <button type="submit" onClick={this.handleClick}>+</button>
        </header>
      </div>
    );
  }
}

export default App;