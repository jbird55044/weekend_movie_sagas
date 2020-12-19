import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieList.css'


class MovieList extends Component {
    state = {
        showAdd: true,
        pizzaChoice: ''
    }
    
    componentDidMount() {
        // use component did mount to dispatch an action to request the plantList from the API
        this.props.dispatch({type: 'FETCH_MOVIES'});
        this.props.dispatch({type: 'FETCH_GENRES_TABLE'});
    }


    togglAddRemove = () => {
        this.setState({
            showAdd: !this.state.showAdd // flip the boolean using ! NOT
        })
        // this.addPizza()
    }

    detailsPage = (movieId, description) => {
        this.props.dispatch({type: 'UPDATE_DETAIL_REDUX', payload: description});
        this.props.dispatch({type: 'FETCH_MOVIE_GENRES', payload: movieId});
        console.log (`genres from db call`, this.props.reduxState.movieGenres);
        this.props.history.push("/DetailsPage");

    };
    

    render() {
        return (
            <div>
                <hr/>
                <h3>Movie List:</h3>
                    {this.props.reduxState.movieList.map((movie, index) => {
                        return (
                            <div className="card" key={index}>
                                <img width="135px" height="135px" src={movie.poster} alt={movie.title}/>
                                <h2>Title: {movie.title}</h2>
                                <p>ID:{movie.id}</p>
                                <button onClick={this.togglAddRemove}>
                                    {this.state.showAdd ? `Option A!` : `Option B!`}
                                </button>
                                <button onClick={(event)=>this.detailsPage(movie.id, movie.description)}>Get Details!</button>
                                <section>
                                    { this.state.showAdd && // if this part is false, the next part won't show
                                        `Name: ${movie.title}` } 
                                </section> 
                            </div>
                        );
                    })}
            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxStateOnProps)(MovieList);
 