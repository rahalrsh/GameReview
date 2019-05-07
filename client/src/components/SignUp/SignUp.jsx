import React, { Component } from 'react';
import axios from 'axios';
import './SignUp.css'
import { Button } from 'react-bootstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoggedInAction, addFlashMessage, removeFlashMessage } from '../../redux/actions/index';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    }
  }

  signUp() {
    const {username, email, password, confirmpassword} = this.state;
    console.log(username);
    console.log(email);
    console.log(password);
    console.log(confirmpassword);

    axios.post('/api/user/signup', {
      name: username,
      email: email,
      password: password,
      confirmpassword: confirmpassword
    })
    .then( (response) => {
      console.log(response);
      debugger;

      if(response.data.success) {
        this.props.userLoggedInAction({userName: response.data.payload.name});
        this.props.history.push("/dashboard");
      }
    })
    .catch( (error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="signup-form">
          <form>
            <h2>Sign Up</h2>
            <p>Sign up with your email address</p>
            <div className="form-group">
              <input placeholder="Username" className="form-control" type="text"
              onChange={(event) => this.setState({username: event.target.value})}/>
            </div>
            <div className="form-group">
              <input placeholder="Email Address" className="form-control" type="text"
              onChange={(event) => this.setState({email: event.target.value})}/>
            </div>
            <div className="form-group">
              <input placeholder="Password" className="form-control" type="password"
              onChange={(event) => this.setState({password: event.target.value})}/>
            </div>
            <div className="form-group">
              <input placeholder="Confirm Password" className="form-control" type="password"
              onChange={(event) => this.setState({confirmpassword: event.target.value})}/>
            </div>
            <div className="form-group">
              <Button variant="success" block onClick={() => this.signUp()}>Sign Up</Button>
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
export default connect(mapStateToProps, matchDispatchToProps)(SignUp);