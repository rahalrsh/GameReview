import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoggedInAction, addFlashMessage, removeFlashMessage } from '../../../redux/actions/index';

import './CommentGame.css'

class CommentGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: '',
        }
    }

    // componentDidMount() {
        // debugger;
    //     console.log('/api/games/rate/' + this.props.game._id + '/comments');
    //     axios.get('/api/games/rate/' + this.props.game._id + '/comments', {
    //     })
    //     .then((response) => {
    //         console.log(response);
    //         if(response.data.success) {
    //             debugger;
    //         }
    //         if(!response.data.success) {
    //             this.props.addFlashMessage({flashMessageType: 'Error', flashMessageText: response.data.message});
    //         }
    //     })
    //     .catch( (error) => {
    //         console.error(error);
    //     });
    // }

    submitComment = () => {
        const { 
            comment
        } = this.state;
  
        // console.log(this.state);
        // console.log(this.props);
        console.log('/api/games/rate/' + this.props.game._id + '/comment_game');
  
        axios.post('/api/games/rate/' + this.props.game._id + '/comment_game', {
            comment : comment
        })
        .then((response) => {
            console.log(response);
            if(response.data.success) {
                this.props.addFlashMessage({flashMessageType: 'Success', flashMessageText: response.data.message});
                
                // Notify parent component
                const newlyAddedComment = response.data.payload.comment;
                this.props.onNewCommentAdded(newlyAddedComment);
            }
            if(!response.data.success) {
                this.props.addFlashMessage({flashMessageType: 'Error', flashMessageText: response.data.message});
            }
        })
        .catch( (error) => {
            console.error(error);
            debugger;
            if(error.response.status === 401) {
                // Unauthorized
                this.props.addFlashMessage(
                    {
                        flashMessageType: 'Error', 
                        flashMessageText: 'Please Log In To Comment This Game'
                    }
                );
            }
        });
    }


    handleTextAreaInputChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({comment: value});
    }

    render() {
        const { 
            comment
        } = this.state;

        return(
            <span>
                <form>
                    <h4>Leave a Comment</h4>
                    <hr/>
                    <div className="form-group">
                        <textarea 
                            onChange={this.handleTextAreaInputChange}
                            className="form-control" rows = "5" cols = "50" name="description" 
                            placeholder="Comment...">
                        </textarea>
                    </div>
                    <div className="form-group">
                        <Button onClick={this.submitComment.bind(this)} variant="primary">Submit Comment</Button>
                    </div>
                </form>

                <br/>

                <div className="comments-list">
                    {
                        this.props.game.comments.map((comment) => {
                            return(
                                <div key={comment._id} className="media">
                                    <a className="media-left clickable">
                                        {/* <img src="http://lorempixel.com/40/40/people/1/"/> */}
                                        <i className="far fa-user fa-2x"></i>
                                    </a>
                                    <div className="media-body">
                                        <h4 className="media-heading user_name">{comment.user.name}</h4>
                                        {comment.comment}
                                        <p><small>
                                            <a className="clickable" style={{paddingLeft: '0px'}}>Like</a>
                                            |
                                            <a className="clickable">
                                                {comment.date}
                                            </a>
                                        </small></p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                

            </span>
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

export default connect(mapStateToProps, matchDispatchToProps)(CommentGame);