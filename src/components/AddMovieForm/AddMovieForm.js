import React, { Component } from 'react';
import { connect } from 'react-redux'
import './AddMovieForm.css'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: theme.spacing.unit / 4,
      },
      noLabel: {
        marginTop: theme.spacing.unit * 3,
      },
  });

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
            let collectedValue = Array.from(event.target.selectedOptions, option => parseInt(option.value));
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
    };

    cancelAddMovie = () => {
        console.log (`Cancel Add, Clear State`);
        this.setState({
            movieToAdd: {
                title: '',
                poster: '',
                description: '',
                genre_id: [],
            }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.addMovie} >
                <TextField
                    required
                    value={this.state.movieToAdd.title} 
                    onChange={(event)=>this.handleChangeFor(event, 'title')}
                    id="outlined-required"
                    label="Title"
                    defaultValue="Title"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                 />
                 <TextField
                    required
                    value={this.state.movieToAdd.poster} 
                    onChange={(event)=>this.handleChangeFor(event, 'poster')}
                    id="outlined-required"
                    label="Poster Location"
                    defaultValue="poster location"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                 />
                 <TextField
                    multiline
                    rowsMax="4"
                    value={this.state.movieToAdd.description} 
                    onChange={(event)=>this.handleChangeFor(event, 'description')}
                    id="outlined-required"
                    label="Description of Movie"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                 />
                    {/* <input value={this.state.movieToAdd.title} onChange={(event)=>this.handleChangeFor(event, 'title')} type="text" placeholder="title" /> */}
                    {/* <input value={this.state.movieToAdd.poster} onChange={(event)=>this.handleChangeFor(event, 'poster')} type="text" placeholder="poster" /> */}
                    <p>&nbsp;</p>
                    <select id="genre" name="genre" onChange={(event)=>this.handleChangeFor(event, 'genre_id')} multiple size="8">
                            {this.renderGenreSelectionList()}
                    </select>
                    <input type="submit" value="Submit" />
                </form>
                <button onClick={this.cancelAddMovie}>Cancel</button>
            </>
        )
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxStateOnProps)(withStyles(styles)(AddMovieForm)); 