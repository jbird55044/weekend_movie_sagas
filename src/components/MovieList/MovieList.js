import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieList.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
      maxWidth: 250,
      margin: 20,
    },
    media: {
      height: 250,
    },
  };
  

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
    }

    detailsPage = (movieId, description) => {
        this.props.dispatch({type: 'UPDATE_DETAIL_REDUX', payload: description});
        this.props.dispatch({type: 'FETCH_MOVIE_GENRES', payload: movieId});
        console.log (`genres from db call`, this.props.reduxState.movieGenres);
        this.props.history.push("/DetailsPage");

    };
    

    render() {
        const { classes } = this.props;
        return (
            <div>
                <hr/>
                <h3>Movie List:</h3>
                    {this.props.reduxState.movieList.map((movie, index) => {
                        return (
                            <Card key={index} className={classes.card} >
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image={movie.poster}
                                    title={movie.title}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {movie.title}
                                    </Typography>
                                    <Typography component="p">
                                        Movie Details are Available!
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button onClick={(event)=>this.detailsPage(movie.id, movie.description)} size="small" color="primary">
                                    Get Details!
                                    </Button>
                                </CardActions>
                            </Card>





                            // <div className="card" key={index}>
                            //     <img width="135px" height="135px" src={movie.poster} alt={movie.title}/>
                            //     <h2>Title: {movie.title}</h2>
                            //     <p>ID:{movie.id}</p>
                            //     <button onClick={this.togglAddRemove}>
                            //         {this.state.showAdd ? `Option A!` : `Option B!`}
                            //     </button>
                            //     <button onClick={(event)=>this.detailsPage(movie.id, movie.description)}>Get Details!</button>
                            //     <section>
                            //         { this.state.showAdd && // if this part is false, the next part won't show
                            //             `Name: ${movie.title}` } 
                            //     </section> 
                            // </div>
                        );
                    })}
            </div>
        );
    }
}

MovieList.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
const putReduxStateOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxStateOnProps)(withStyles(styles)(MovieList));
 