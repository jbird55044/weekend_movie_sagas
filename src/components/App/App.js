import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import MovieList from '../MovieList/MovieList';
import DetailsPage from '../DetailsPage/DetailsPage';
import AddMovieForm from '../AddMovieForm/AddMovieForm';
// import Checkout from '../Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to the Movies!</h1>
        <Router>
          <nav className="navBarClass">
            <ul>
              <li><Link to="/">Home -</Link></li> 
              <li><Link to="/MovieList">Movie List -</Link></li>
              <li><Link to="/AddMovieForm">Add Movie Form</Link></li>
            </ul>
          </nav>

          <Route exact path="/" component={Home} />
          <Route exact path="/MovieList" component={MovieList} />
          <Route exact path="/DetailsPage" component={DetailsPage} />
          <Route exact path="/AddMovieForm" component={AddMovieForm} />
        </Router>
      </div>
    );
  }
}
 
export default App;
