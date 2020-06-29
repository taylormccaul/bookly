import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      habit: '',
      habits: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  addItem(e) {
    e.preventDefault();

    const habitsRef = firebase.database().ref('habits');

    const newHabit = {
      text: this.state.userInput,
      key: Date.now()
    }

    habitsRef.push(newHabit);

    this.setState({
      userInput: '',
      habit: ''
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>Habit Tracker</h1>
        </header>
        <form onSubmit={this.addItem} className="new-habit">
          <input type="text" className="add-new-habit" placeholder="Add a new habit" value={this.state.userInput} onChange={this.handleChange} />
          <button type="submit">+</button>
        </form>
        <div className="habits">
          <ul>
            {this.state.habits.map((habit) => {
              return (
                <li key={habit}>{habit}</li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;