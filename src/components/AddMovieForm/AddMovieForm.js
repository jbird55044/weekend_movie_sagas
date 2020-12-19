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
            genre_id: 0,
        }
    }

    renderGenreSelectionList(){
        let genreArray = [];
        let genre = this.props.reduxState.genreListTable;
        for(var i = 0; i < genre.length; i++){
            genreArray.push(<option value={genre[i].id}> {genre[i].name}</option>)
        }
            return genreArray
        }

    handleChangeFor = (event, inputProperty) => {
        this.setState({
          // this is a spread to put variables into respective homes below layer 1
          movieToAdd: {
            ...this.state.movieToAdd, 
            [inputProperty]: event.target.value
          }
        })
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
                <select id="rating" name="rating" onChange={(event)=>this.handleChangeFor(event, 'genre_id')}>
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