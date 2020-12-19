import React, { Component } from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import MovieList from '../MovieList/MovieList';
import MovieListItem from '../MovieListItem/MovieListItem';
import DetailsPage from '../DetailsPage/DetailsPage';
// import Checkout from '../Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to the Movies!</h1>
        <Router>
          <nav>
            <Link to="/">Home</Link> 
            <p></p>
            <Link to="/MovieList">Movie List Here</Link>
          </nav>

          <Route exact path="/" component={Home} />
          <Route exact path="/MovieList" component={MovieList} />
          <Route exact path="/MovieListItem" component={MovieListItem} />
          <Route exact path="/DetailsPage" component={DetailsPage} />
        </Router>
      </div>
    );
  }
}
 
export default App;
