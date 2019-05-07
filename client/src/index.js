import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { Provider } from "react-redux";
import store from './redux/store/store';
import { userLoggedOutAction } from './redux/actions/index';

// axios.defaults.baseURL = 'http://localhost:5000/';
// axios.defaults.withCredentials = true;
// axios interceptors to check for 401 unauthenticated
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
    console.error('Interceptor Detected 401: Not-Authenticated');
    store.dispatch(userLoggedOutAction({}));
    // currentComponent.props.history.push('/LogIn');
    }
    return Promise.reject(error);;
});


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
