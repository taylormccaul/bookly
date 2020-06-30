import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ReactDOM from 'react-dom';
//import firebase from './firebase.js';

const API_URL = `https://www.googleapis.com/books/v1/volumes`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: '',
      isLoaded: false,
      items: []
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
    
    axios.get(`${API_URL}?q=${this.state.userInput}&maxResults=15`)
    .then(data => {
      ///console.log(data.data)
      this.setState({
        items: [...data.data.items]
      });
      console.log(this.state.items[0]['volumeInfo'].title)
    });

    //console.log(this.state.items[0].volumeInfo.title)
    //console.log(this.state.items[0].volumeInfo.imageLinks.thumbnail)
    /*fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.userInput}`)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          userInput: '',
          isLoaded: true,
          items: [result.items[0], result.items[1], result.items[2]]
        });
      }
    )*/
    //console.log(this.state.items);
    //console.log("https://www.googleapis.com/books/v1/volumes?q=")
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search-bar" className="search-bar" placeholder="Search for a book." value={this.state.userInput} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        <div className="search-results">
          {this.state.items.map((item, index) => {
            return (
              <div className="search-result">
                <img src={this.state.items[index]['volumeInfo'].imageLinks.thumbnail} alt="" />
                {this.state.items[index]['volumeInfo'].title.length > 40 ?
                <p>{this.state.items[index]['volumeInfo'].title.substring(0, 40) + "..."}</p>
                :
                <p>{this.state.items[index]['volumeInfo'].title}</p>
                }
              </div>
            )
          })}
        </div>
        {/*<button type="submit">+</button>*/}
      </div>
    )
  }
}

export default App;

/*class App extends Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      habit: '',
      habits: [],
      date: ''
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

    const habitsRef = firebase.database().ref('habits');;
    let d = new Date();

    let dateString = `${d.getMonth() + 1}_${d.getDate()}_${d.getFullYear()}`;

    const newHabit = {
      title: this.state.userInput,
      id: Date.now(),
      daysCompleted: {
        dateString: false
      }
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

export default App;*/
