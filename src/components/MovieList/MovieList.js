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

    detailsPage = () => {
        this.props.dispatch({type: 'UPDATE_DETAIL_REDUX', payload: this.props.movie.description});
        // console.log (`history`, this.props.history);
        this.props.history.push("/DetailsPage");
    };
    
    itemPage = () => {
        this.props.dispatch({type: 'UPDATE_DETAIL_REDUX', payload: this.props.movie.description});
        // console.log (`history`, this.props.history);
        this.props.history.push("/DetailsPage");
    };
    // deletePlant = (evt) => {
    //     console.log(evt.target.value);
    //     let plantId = Number(evt.target.value);
    //     this.props.dispatch( {type: 'DELETE_PLANT', payload: plantId});
    // }

    // detailPlant = (event, plantId) => {
    //     console.log('in Detail Plant:', event, plantId);
    //     this.props.dispatch( {type: 'DETAIL_PLANT', payload: plantId});
    // }

    render() {
        return (
            <div>
                <hr/>
                <h3>Movie List:</h3>
                <button onClick={this.itemPage}>ItemPGE</button>
                    {/* {JSON.stringify(this.props.reduxState.movieList)} */}
                    {/* {JSON.stringify(this.props.reduxState.genreListTable)} */}
                            {this.props.reduxState.movieList.map((movie, index) => {
                                return (
                                    <div className="card">
                                        <img width="135px" height="135px" src={movie.poster} alt={movie.title}/>
                                        <h2>Title: {movie.title}</h2>
                                        <p>ID:{movie.id}</p>
                                        <button onClick={this.togglAddRemove}>
                                            {this.state.showAdd ? `Option A!` : `Option B!`}
                                        </button>
                                        <button onClick={this.detailsPage}>Get Details!</button>
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
 