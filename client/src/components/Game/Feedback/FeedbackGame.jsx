import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoggedInAction, addFlashMessage, removeFlashMessage } from '../../../redux/actions/index';


class FeedbackGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            feedback: ''
        }
    }

    submitFeedback = () => {
        const { 
            feedback
        } = this.state;
  
        // console.log(this.state);
        // console.log(this.props);
        console.log('/api/games/rate/' + this.props.game._id + '/feedback_game');
  
        axios.post('/api/games/rate/' + this.props.game._id + '/feedback_game', {
            feedback     : feedback
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
                        flashMessageText: 'Please Log In To Provide Feedback To This Game'
                    }
                );
            }
        });
    }


    handleTextAreaInputChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({feedback: value});
    }

    render() {
        const { 
            feedback
        } = this.state;

        return(
            <form>
                <h4>Feedback and Suggestions</h4>
                <hr/>
                <div className="form-group">
                    <textarea 
                        onChange={this.handleTextAreaInputChange}
                        className="form-control" rows = "5" cols = "50" name="description" 
                        placeholder="Feedback and Suggestions">
                    </textarea>
                </div>
                <div className="form-group">
                    <Button onClick={this.submitFeedback.bind(this)} variant="primary">Submit Feedback</Button>
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

export default connect(mapStateToProps, matchDispatchToProps)(FeedbackGame);