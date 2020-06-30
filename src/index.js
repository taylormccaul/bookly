import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

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

//ReactDOM.render(<App />, document.getElementById("root"));

//import React, { Component } from 'react';
/*import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { auth } from './services/firebase';*/
//import firebase from 'firebase';

/*function PrivateRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route 
    {...rest} 
    render={(props) => authenticated === true
    ? <Component {...props} />
    : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({component: Component, authenticated, ...rest}) {
  return (
    <Route
    {...rest}
    render={(props) => authenticated === false
    ? <Component {...props} />
    : <Redirect to="/chat" />}
    />
  )
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      //error: null,
      //email: '',
      //password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange() {

  }

  handleSubmit() {
    
  }

  /*componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }*/
  
  /*render() {
    return this.state.loading === true ? <h2>Loading...</h2> :
    (<Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat}></PrivateRoute>
        <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}></PublicRoute>
        <PublicRoute path="/login" authenticated={this.state.authenticated} component={Login}></PublicRoute>
      </Switch>
    </Router>)
  }
}

export default App;

/*class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      idea: '',
      ideas: [],
      user: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const ideasRef = firebase.database().ref('ideas');

    const idea = {
      title: this.state.idea,
      user: this.state.user.displayName || this.state.user.email
    }

    ideasRef.push(idea);

    this.setState({
      username: '',
      idea: ''
    });
  }

  removeIdea(ideaId) {
    const ideaRef = firebase.database().ref(`/ideas/${ideaId}`);
    ideaRef.remove();
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result.credential.idToken);
      const user = result.user;
      this.setState({ 
        user
      });
    });
  }

  componentDidMount() {
    const ideasRef = firebase.database().ref('ideas');
    
    ideasRef.on('value', (snapshot) => {
      let ideas = snapshot.val();
      let newState = [];
      for (let idea in ideas) {
        newState.push({
          id: idea,
          title: ideas[idea].title,
          user: ideas[idea].user
        });
      }
      this.setState({
        ideas: newState
      })
    });

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user
        });
      }
    })
  }

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <h1>Books and Crannies</h1>
            {this.state.user ? 
            <button onClick={this.logout}>Logout</button>
            :
            <button onClick={this.login}>Login</button>
            }
          </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
             <img src={this.state.user.photoURL} alt={""}/>
            </div>
            <div className='container'>
              <section className='add-item'>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" name="username" placeholder="What's your name?" value={this.state.user.displayName || this.state.user.email} />
                  <input type="text" name="idea" placeholder="What is the title of the book?" onChange={this.handleChange} value={this.state.idea} />
                  <input type="text" name="author" placeholder="Author?" onChange={this.handleChange} value={this.state.author} />
                  <input type="text" name="genre" placeholder="Genre?" onChange={this.handleChange} value={this.state.genre} />
                  <input type="textarea" name="notes" placeholder="Why did you suggest this book?" onChange={this.handleChange} value={this.state.notes} />
                  <button>Add Idea</button>
                </form>
              </section>
              <section className='display-item'>
                <div className="wrapper">
                  <ul>
                    {this.state.ideas.map((idea) => {
                      return (
                        <li key={idea.id}>
                          <h3>{idea.title}</h3>
                          <p>Suggested by: {idea.user}
                            {idea.user === this.state.user.displayName || idea.user === this.state.user.email ?
                            <button onClick={() => this.removeIdea(idea.id)}>Remove Idea</button> : null}
                          </p>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </section>
            </div>
          </div>
          :
          <div className="wrapper">
            <p className="login-message">You must be logged in to view book club info.</p>
          </div>
        }
      </div>
    )
  }
}

export default App;*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();