import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css'


class Home extends Component {
  
    render() {
        return (
            <div>
                <h3>Welcome Home</h3>
                <p>Here you will be able to do great stuff.</p>
                <p>Greatness does not come easily!</p>
            </div>
        );
    }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  })

export default connect(putReduxStateOnProps)(Home);
 