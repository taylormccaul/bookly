import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

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
      title: this.state.userInput,
      id: Date.now()
    }

    habitsRef.push(newHabit);

    this.setState({
      userInput: '',
      habit: ''
    });
  }

  componentDidMount() {
    const habitsRef = firebase.database().ref('habits');

    habitsRef.on('value', (snapshot) => {
      let habits = snapshot.val();
      let newState = [];
      for (let habit in habits) {
        newState.push({
          id: habit,
          title: habits[habit]
        });
        //console.log(habits[habit])
      }

      this.setState({
        habits: newState
      });
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
                <li key={habit.id}>{habit.title.title}</li>
                //<li key={habit.key}>{habit.text}</li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;