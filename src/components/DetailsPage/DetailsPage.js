import React, { Component } from 'react';
import { connect } from 'react-redux';

import './DetailsPage.css'


class DetailsPage extends Component {

    state = {
        showAdd: true,
        pizzaChoice: ''
    }
    backToList = () => {
        this.props.history.push("/MovieList");
    };

    render() {

        return (
            <div className="detailsClass">
                <h1>Details About your Movie:</h1>
                <p>{this.props.reduxState.currentMovieDetails}</p>
                <p>&nbsp;</p>
                <button onClick={this.backToList}>Back To List</button>

                <h3>Genres Associtated to this Movie:</h3>
                {this.props.reduxState.movieGenres.map((genre, index) => {
                        return (
                          <p>{genre.name}</p>
                        );
                    })}
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxState) => ({ reduxState })
export default connect(putReduxStateOnProps)(DetailsPage);