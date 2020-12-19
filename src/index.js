import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put}  from 'redux-saga/effects'


// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery ('FETCH_MOVIES', fetchMovies);
    yield takeEvery ('FETCH_GENRES', fetchGenres);
    yield takeEvery ('FETCH_GENRES_TABLE', fetchGenresTable);
}

function* fetchMovies() {
    // Move GET request from App.js
    console.log('In fetchMovies saga');
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.get('/api/movie');
        // put data into store via Reducer
        yield put({ type: 'SET_MOVIES', payload: response.data });
    } catch ( error ) {
        console.log('error with Movie get request', error);
    }
} 

function* fetchGenres() {
    // TODO - Move GET request from App.js
    console.log('In fetchMovies saga');
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.get('/api/movie');
        // put data into store via Reducer
        yield put({ type: 'SET_MOVIES', payload: response.data });
    } catch ( error ) {
        console.log('error with Movie get request', error);
    }
} 

function* fetchGenresTable() {
    // Move GET request from App.js
    console.log('In fetchGenres saga');
    // Go to server, update redux store with data from server
    try {
        // get data from db
        const response = yield axios.get('/api/genre');
        // put data into store via Reducer
        yield put({ type: 'SET_GENRES_TABLE', payload: response.data });
    } catch ( error ) {
        console.log('error with Genres get request', error);
    }
} 

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movieList = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genreListTable = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES_TABLE':
            return action.payload;
        default:
            return state;
    }
}

const currentMovieDetails = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_DETAIL_REDUX':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movieList,
        genreListTable,
        currentMovieDetails
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
