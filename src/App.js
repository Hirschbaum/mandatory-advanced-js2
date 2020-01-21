import { Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import './App.css';
import HomePage from './Home';
import AddMovie from './Adding';
import Details from './Details';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        
        <Router>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/movies/:id' component={Details}></Route>
          <Route path='/addmovie' component={AddMovie}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
