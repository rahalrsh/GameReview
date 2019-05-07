import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoggedInAction, addFlashMessage, removeFlashMessage } from '../../../redux/actions/index';


class ReportGameBug extends Component {
    constructor(props){
        super(props);
        this.state = {
            bugTitle: '',
            bugDescription: ''
        }
    }

    submitRating = () => {
        const { 
            bugTitle,
            bugDescription
        } = this.state;
  
        console.log('/api/games/rate/' + this.props.game._id + '/report_game_bug');

        axios.post('/api/games/rate/' + this.props.game._id + '/report_game_bug', {
            title          : bugTitle,
            description    : bugDescription
        })
        .then((response) => {
            console.log(response);
            if(response.data.success) {
                this.props.addFlashMessage({flashMessageType: 'Success', flashMessageText: response.data.message});
            }
            if(!response.data.success) {
                this.props.addFlashMessage({flashMessageType: 'Error', flashMessageText: response.data.message});
            }
        })
        .catch( (error) => {
            console.error(error);
            if(error.response.status === 401) {
                // Unauthorized
                this.props.addFlashMessage(
                    {
                        flashMessageType: 'Error', 
                        flashMessageText: 'Please Log In To Rate This Game'
                    }
                );
            }
        });
    }

    render() {
        const { 
            bugTitle,
            bugDescription
        } = this.state;

        return(
            <form>
                <h4>Report a New Bug</h4>
                <hr/>
                <div className="form-group">
                    <input 
                        placeholder="Bug Title" className="form-control" name="title" type="text"
                        onChange={(event) => this.setState({bugTitle: event.target.value})}
                    />
                </div>
                <div className="form-group">
                    <textarea 
                        className="form-control" rows = "5" cols = "50" name="description" 
                        placeholder="Issue Description"
                        onChange={(event) => this.setState({bugDescription: event.target.value})}>
                    </textarea>
                </div>
                <div className="form-group">
                    <Button onClick={this.submitRating.bind(this)} variant="primary">Report Bug</Button>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    // Map state.userName to props.userName
    return {
      
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

export default connect(mapStateToProps, matchDispatchToProps)(ReportGameBug);