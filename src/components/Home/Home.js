import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css'


class Home extends Component {
  
    render() {
        return (
            <div className="homePageClass">
                <h3>Welcome to Movie Manager Deluxe!</h3>
                <p>Here you will be able to do great stuff.</p>
                <img src="images/home_image.png" alt="theater seating" />
            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxStateOnProps)(Home);
 