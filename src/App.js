import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      habits: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      userInput: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let newHabit = {
      text: this.state.userInput,
      key: Date.now()
    }

    this.setState({
      habits: [...this.state.habits, newHabit.text]
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>Habit Tracker</h1>
        </header>
        <form onSubmit={this.handleSubmit} className="new-habit">
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