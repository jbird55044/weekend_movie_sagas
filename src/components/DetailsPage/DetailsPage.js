import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './DetailsPage.css'

const styles = {
    card: {
      maxWidth: 400,
      margin: 20,
      marginLeft: 40,
    },
    media: {
      height: 100,
    },
  };
  

class DetailsPage extends Component {

    
    backToList = () => {
        this.props.history.push("/MovieList");
    };

    render() {
        const { classes } = this.props;
        return (

            <Card className={classes.card} >
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image="images/home_image.png"
                title={this.props.reduxState.currentMovieDetails.title}
                />
                <CardContent>
                <Typography gutterBottom variant="h4" component="h2">
                    {this.props.reduxState.currentMovieDetails.title}
                </Typography>
                <Typography component="p">
                    {this.props.reduxState.currentMovieDetails.description}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    --------------------------------
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    Genres Associtated to this Movie:
                </Typography>
                <Typography component="p">
                    {this.props.reduxState.movieGenres.map((genre, index) => {
                        return (
                          <li key={index}>{genre.name}</li>
                        );
                    })}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={this.backToList} size="small" color="primary">
                Return to List!
                </Button>
            </CardActions>
        </Card>

 
        )
    }
}

DetailsPage.propTypes = {classes: PropTypes.object.isRequired,};
const putReduxStateOnProps = (reduxState) => ({ reduxState })

export default connect(putReduxStateOnProps)(withStyles(styles)(DetailsPage));