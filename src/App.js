import { Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import './App.css';
import HomePage from './Home';
import AddMovie from './Adding';
import Details from './Details';
import EditMovie from './Editing';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        
        <Router>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/movie-deatils/:id' component={Details}></Route>
          <Route path='/addmovie' component={AddMovie}></Route>
          <Route path='/edit/:id' component={EditMovie}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
