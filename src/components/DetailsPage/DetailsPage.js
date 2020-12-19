import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';

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
                <h1>Details</h1>
                {JSON.stringify(this.props.reduxState.currentMovieDetails)}
                <p>&nbsp;</p>
                <button onClick={this.backToList}>Back To List</button>
            </div>
        )
    }
}
const putReduxStateOnProps = (reduxState) => ({ reduxState })
export default connect(putReduxStateOnProps)(DetailsPage);