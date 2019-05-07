import React, { Component } from 'react';
import axios from 'axios';
import './LogIn.css'
import { Button } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoggedInAction, addFlashMessage, removeFlashMessage } from '../../redux/actions/index';

class LogIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  login() {
    const {email, password} = this.state;
    console.log(email);
    console.log(password);

    axios.post('/api/user/login', {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);

      // TODO: Show message

      if(response.data.success) {
        this.props.userLoggedInAction({userName: response.data.payload.name});
        this.props.addFlashMessage({flashMessageType: 'Success', flashMessageText: response.data.message});
        this.props.history.push("/dashboard");
      }
      if(!response.data.success) {
        this.props.addFlashMessage({flashMessageType: 'Error', flashMessageText: response.data.message});
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="login-form">
          <form>
            <h2>Log In</h2>
            <p>Login with your email address</p>
            <div className="form-group">
              <input placeholder="Email Address" className="form-control" type="text"
              onChange={(event) => this.setState({email: event.target.value})}/>
            </div>
            <div className="form-group">
              <input placeholder="Password" className="form-control" type="password"
              onChange={(event) => this.setState({password: event.target.value})}/>
            </div>
            <div className="form-group">
              <Button variant="success" block onClick={() => this.login()}>Log In</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Map state.userName to props.userName
  return {
    userName : state.userName,
    isLoggedIn: state.isLoggedIn
  };
}

function matchDispatchToProps(dispatch) {
  // Map now I can dispatch action like this.props.actionName(payload)
  return bindActionCreators({
    userLoggedInAction: userLoggedInAction,
    addFlashMessage: addFlashMessage,
    removeFlashMessage: removeFlashMessage
  }, dispatch)
}

// conncet react-redux: connect this react component to redux store
export default connect(mapStateToProps, matchDispatchToProps)(LogIn);