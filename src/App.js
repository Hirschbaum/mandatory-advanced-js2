import { Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './Home';
import AddMovie from './AddMovie';
import Details from './Details';
import EditMovie from './EditMovie';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        
        <Router>
          <Route exact path='/' component={Home}></Route>
          <Route path='/movie-details/:id' component={Details}></Route>
          <Route path='/addmovie' component={AddMovie}></Route>
          <Route path='/edit/:id' component={EditMovie}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
