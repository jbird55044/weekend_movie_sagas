import React, { Component } from 'react';
import { connect } from 'react-redux'
import './AddMovieForm.css'

class AddMovieForm extends Component {
    // You will need to keep this state in this component
    // if you're only using something in one component,
    // you do not need to move it to redux
    state = {
        movieToAdd: {
            title: '',
            poster: '',
            description: '',
            genre_id: [],
        }
    }

    componentDidMount() {
        // use component did mount to dispatch an action to request the plantList from the API
        this.props.dispatch({type: 'FETCH_GENRES_TABLE'});
    }
    renderGenreSelectionList(){
        let genreArray = [];
        let genre = this.props.reduxState.genreListTable;
        for(var i = 0; i < genre.length; i++){
            genreArray.push(<option key={i} value={genre[i].id}> {genre[i].name}</option>)
        }
            return genreArray
        }

    handleChangeFor = (event, inputProperty) => {
        if ( inputProperty === 'genre_id') {
            let collectedValue = Array.from(event.target.selectedOptions, option => option.value);
            console.log (`In Hadle Change, collectedValue:`, collectedValue);
            this.setState({
                movieToAdd: {
                    ...this.state.movieToAdd, 
                    genre_id: collectedValue
                }
            });
        }  else {
            this.setState({
              // this is a spread to put variables into respective homes below layer 1
              movieToAdd: {
                ...this.state.movieToAdd, 
                [inputProperty]: event.target.value
              }
            })
        }
    }
 
    addMovie = (event) => {
        
        event.preventDefault();
        console.log (`State being dispatched:`, this.state.movieToAdd);
        this.props.dispatch({ type: 'ADD_MOVIE', payload: this.state.movieToAdd })    
    }

    render() {
        return (
            <form onSubmit={this.addMovie}>
                <input onChange={(event)=>this.handleChangeFor(event, 'title')} type="text" placeholder="title" />
                <input onChange={(event)=>this.handleChangeFor(event, 'poster')} type="text" placeholder="poster" />
                <input onChange={(event)=>this.handleChangeFor(event, 'description')} type="text" placeholder="description" />
                <p></p>
                <select id="genre" name="genre" onChange={(event)=>this.handleChangeFor(event, 'genre_id')} multiple size="8">
                        {this.renderGenreSelectionList()}
                </select>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxStateOnProps) (AddMovieForm); 