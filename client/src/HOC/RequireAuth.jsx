import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

// WHY USE HOC: https://stackoverflow.com/questions/43210516/how-to-redirect-from-axios-interceptor-with-react-router-v4
// Simple answer: for axios.interceptor->401->redux store->logoutaction->RequireAuthHOC->require auth components change path
// NOTE axios is defined outside react route. So change path has to go thru redux store
export default function(ComposedComponent) {
    class RequireAuth extends Component {
        
        componentWillMount() {
            // debugger;
            const dotcom_user   = Cookies.get('dotcom_user');
            const logged_in   = Cookies.get('logged_in');
            if(logged_in !== 'true' || !dotcom_user) {
                console.log('Require Auth componentWillMount:');
                console.log(this.props);
                this.props.history.push('/login');
            }
        };

        componentWillUpdate(nextProps) {
            // debugger;
            if(!nextProps.isLoggedIn) {
                console.log('Require Auth componentWillUpdate:');
                console.log(this.props);
                this.props.history.push('/login');
            }
        };

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        // debugger;
        return {
            userName : state.userName,
            isLoggedIn: state.isLoggedIn
        };
    }

    return connect(mapStateToProps)(RequireAuth);
}