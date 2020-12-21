import React, { Component } from 'react';
import { connect } from 'react-redux'
import './AddMovieForm.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


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
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
  });
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
     PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
      },
    };

    function getStyles(name, that) {
        return {
          fontWeight:
            that.state.chipGenre.indexOf(name.id) === -1
              ? that.props.theme.typography.fontWeightRegular
              : that.props.theme.typography.fontWeightMedium,
        };
      }

    function Transition(props) {
        return <Slide direction="up" {...props} />;
    }
        

class AddMovieForm extends Component {
    
    state = {
        movieToAdd: {
            title: '',
            poster: '',
            description: '',
            genre_objects: [],
        },
        chipGenre: [],
        openSuccessMessage: false,
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
        if ( inputProperty === 'genre_id_old') {
            let collectedValue = Array.from(event.target.selectedOptions, option => parseInt(option.value));
            console.log (`In Handle Change, collectedValue:`, collectedValue);
            this.setState({
                movieToAdd: {
                    // ...this.state.movieToAdd, 
                    genre_id: collectedValue
                }
            });  
        }  else if ( inputProperty === 'genre_id') {
            console.log (`value, valuid`, event.target.value, event.target.key);
            this.setState({ 
                movieToAdd: {
                    ...this.state.movieToAdd,
                    genre_objects: event.target.value
                },
                ...this.state.chipGenre,
                chipGenre: event.target.value
            });
            console.log (`event target:`, event);
            console.log (`OnChange Genre State:`, this.state.chipGenre);
            console.log (`OnChange MovieToAdd:`, this.state.movieToAdd.genre_id);

        } else {
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
        this.setState({
            movieToAdd: {
                title: '',
                poster: '',
                description: '',
                genre_id: [],
            },
            chipGenre: []
        });
        this.setState({ openSuccessMessage: true });
        // alert ('Movie Added')
    };

    handleClose = () => {
        this.setState({ openSuccessMessage: false });
    }

    cancelAddMovie = () => {
        console.log (`Cancel Add, Clear State`);
        this.setState({
            movieToAdd: {
                title: '',
                poster: '',
                description: '',
                genre_id: [],
            },
            chipGenre: []
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <form className={classes.container} noValidate autoComplete="off" >
                <TextField
                    required
                    value={this.state.movieToAdd.title} 
                    onChange={(event)=>this.handleChangeFor(event, 'title')}
                    id="outlined-required"
                    label="Title"
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
                    <FormControl className={classes.formControl}>
                        {/* {JSON.stringify(this.props.reduxState.genreListTable)} */}
                        <InputLabel htmlFor="select-multiple-chip">Select Genres</InputLabel>
                        <Select
                            multiple
                            value={this.state.chipGenre}
                            onChange={(event)=>this.handleChangeFor(event, 'genre_id')}
                            input={<Input id="select-multiple-chip" />}
                            renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                <Chip  key={value.id} label={value.name} className={classes.chip} />
                                ))}
                            </div>
                            )}
                            MenuProps={MenuProps}
                        >   
                            {this.props.reduxState.genreListTable.map(name => (
                            <MenuItem key={name.id} value={name} style={getStyles(name, this)}>
                                {name.name}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </form>
                <Button variant="contained" color="default" className={classes.button} onClick={this.addMovie} >
                    Add Movie!
                    <ArrowUpwardIcon className={classes.rightIcon} />  
                </Button> 
                <Button variant="contained" color="default" className={classes.button} onClick={this.cancelAddMovie}>
                    Cancel Add
                    <CancelIcon className={classes.rightIcon} />  
                </Button> 
                <div>
                    <Dialog
                        open={this.state.openSuccessMessage}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        >
                        <DialogTitle id="alert-dialog-slide-title">
                            {"Added a Movie"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                            Congratulations, your movie was added to the system.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                            Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </>
        )
    }
}

AddMovieForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const putReduxStateOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxStateOnProps)(withStyles(styles, { withTheme: true })(AddMovieForm)); 