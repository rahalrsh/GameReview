import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Home from "./components/Home/Home";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import AboutUs from "./components/AboutUs/AboutUs";
import Game from "./components/Game/Game";
import Error from "./components/Error/Error";
import FlashMessage from "./components/FlashMessage/FlashMessage";

import Dashboard from "./components/Dashboard/Dashboard";
import DashboardGameSummary from "./components/Dashboard/DashboardGameSummary";
import DashboardGameRatings from "./components/Dashboard/DashboardGameRatings";
import DashboardGameFeedbacks from "./components/Dashboard/DashboardGameFeedbacks";
import DashboardGameBugs from "./components/Dashboard/DashboardGameBugs";
import DashboardGameComments from "./components/Dashboard/DashboardGameComments";

import NewGame from "./components/NewGame/NewGame";

import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoggedInAction, userLoggedOutAction } from './redux/actions/index';

import Cookies from 'js-cookie';

import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    const dotcom_user = Cookies.get('dotcom_user');
    const logged_in   = Cookies.get('logged_in');

    if(logged_in && dotcom_user && logged_in === 'true' && dotcom_user !== '') {
      console.log('Got Cookie data: ' + dotcom_user + ' had previously logged in');
      this.props.userLoggedInAction({userName: dotcom_user}); // will set username and logged in state in redux store
    }
    else {
      this.props.userLoggedOutAction({}); // will clear user name and logged in state in redux store
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar/>
          <div className="content">
            {
              this.props.flashMessageType && this.props.flashMessageText && 
                <FlashMessage 
                  flashMessageType={this.props.flashMessageType} 
                  flashMessageText={this.props.flashMessageText}
                />
            }
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/login" component={LogIn}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/aboutus" component={AboutUs}/>
              <Route path="/game/:gameid/:gamename" component={Game}/>

              <Route path="/dashboard" component={Dashboard} exact/>
              <Route path="/dashboard/game/summary/:gameid/:gamename" component={DashboardGameSummary} exact/>
              <Route path="/dashboard/game/ratings/:gameid/:gamename" component={DashboardGameRatings} exact/>
              <Route path="/dashboard/game/feedbacks/:gameid/:gamename" component={DashboardGameFeedbacks} exact/>
              <Route path="/dashboard/game/bugs/:gameid/:gamename" component={DashboardGameBugs} exact/>
              <Route path="/dashboard/game/comments/:gameid/:gamename" component={DashboardGameComments} exact/>
              <Route path="/game/new" component={NewGame}/>
              <Route component={Error}/>
            </Switch>
          </div>
          <Footer/>
        </BrowserRouter>
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Map state.userName to props.userName
  return {
    flashMessageType: state.flashMessageType,
    flashMessageText: state.flashMessageText
  };
}

function matchDispatchToProps(dispatch) {
  // Map now I can dispatch action like this.props.actionName(payload)
  return bindActionCreators({
    userLoggedInAction: userLoggedInAction,
    userLoggedOutAction: userLoggedOutAction
  }, dispatch)
}

// export default App;
export default connect(mapStateToProps, matchDispatchToProps)(App);