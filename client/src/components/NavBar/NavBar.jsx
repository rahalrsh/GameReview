import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, NavItem, Button } from 'react-bootstrap';
import axios from 'axios';
import './NavBar.css';
import { withRouter } from 'react-router'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoggedOutAction } from '../../redux/actions/index';

class NavBar extends Component {
    logout() {
        console.log("LOG OUT");
  
        axios.post('/api/user/logout', {
        })
        .then((response) => {
          console.log(response);
          // TODO: Show message

          if(response.data.success) {
            console.log(response.data);
            // Dispatch loggedOut Action to redux store
            this.props.userLoggedOutAction({});
            // Navigate to home
            this.props.history.push("/");
            // TODO: Error handling
          }
        })
        .catch( (error) => {
          console.log(error);
        });
    }

    render() {
        var navBarRightBlock;
        if(this.props.isLoggedIn) {
            navBarRightBlock = 
                <Nav>
                    <NavDropdown className="dropdown-left" title={this.props.userName} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => this.props.history.push("/dashboard")}>DashBoard</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.props.history.push("/game/new")}>Create Game</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => this.props.history.push("/settings")}>Settings</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => this.logout()}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>;
        }
        else if (!this.props.isLoggedIn) {
            navBarRightBlock = 
            <Nav>
                <NavItem>
                    <NavLink exact to="/login" className="nav-link no-padding">
                        <Button variant="outline-warning">Log In</Button>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink exact to="/signup" className="nav-link no-padding">
                        <Button variant="outline-warning">Sign Up</Button>
                    </NavLink>
                </NavItem>
            </Nav>;
        }

        return (
            <Navbar className="navbar navbar-expand-lg navbar-light bg-light sticky increase-z-index">
                <Navbar.Brand href="#home">Game Reviews</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavItem>
                            <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink exact to="/aboutus" className="nav-link" activeClassName="active">About</NavLink>
                        </NavItem>
                    </Nav>

                    {navBarRightBlock}
                </Navbar.Collapse>
            </Navbar>
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
        userLoggedOutAction: userLoggedOutAction
    }, dispatch)
  }
  
// conncet react-redux: connect this react component to redux store
export default withRouter(connect(mapStateToProps, matchDispatchToProps)(NavBar));
// export default NavBar;