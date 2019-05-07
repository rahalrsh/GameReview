import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userLoggedInAction, addFlashMessage, removeFlashMessage } from '../../../redux/actions/index';

class RateGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            overallRate: 0,
            graphicsRate: 0,
            storyRate: 0,
            cinematicsRate: 0,
            musicRate: 0,
            contentRate: 0,
            controlsRate: 0,
            gameplayRate: 0,
            other: ''
        }
    }

    submitRating = () => {
        const { 
            overallRate,
            graphicsRate,
            storyRate,
            cinematicsRate,
            musicRate,
            contentRate,
            controlsRate,
            gameplayRate,
            other
        } = this.state;
  
        console.log(this.state);
        console.log(this.props);
        console.log('/api/games/rate/' + this.props.game._id + '/rate_game');
        // debugger;
  
        axios.post('/api/games/rate/' + this.props.game._id + '/rate_game', {
            overallRate     : overallRate,
            graphicsRate    : graphicsRate,
            storyRate       : storyRate,
            cinematicsRate  : cinematicsRate,
            musicRate       : musicRate,
            contentRate     : contentRate,
            controlsRate    : controlsRate,
            gameplayRate    : gameplayRate,
            other           : other
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


    onStarClick(nextValue, prevValue, name) {
        switch(name) {
            case 'overallRating':
                this.setState({overallRate: nextValue});
                break
            case 'graphicsRate':
                this.setState({graphicsRate: nextValue});
                break
            case 'storyRate':
                this.setState({storyRate: nextValue});
                break
            case 'cinematicsRate':
                this.setState({cinematicsRate: nextValue});
                break
            case 'musicRate':
                this.setState({musicRate: nextValue});
                break
            case 'contentRate':
                this.setState({contentRate: nextValue});
                break
            case 'controlsRate':
                this.setState({controlsRate: nextValue});
                break
            case 'gameplayRate':
                this.setState({gameplayRate: nextValue});
                break
            default:
                break;
        }
    }

    handleTextAreaInputChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({other: value});
    }

    render() {
        const { 
            overallRate,
            graphicsRate,
            storyRate,
            cinematicsRate,
            musicRate,
            contentRate,
            controlsRate,
            gameplayRate,
            other
        } = this.state;

        return(
            <form>
                <h4>Rate {this.props.game.title}</h4>
                <hr/>

                <div className="row" style={{marginBottom: '20px'}}>
                    <div className="col-md-4">
                        <h5>Overall Rating</h5>
                    </div>
                    <div className="col-md-4">
                        <StarRatingComponent 
                            name="overallRating" 
                            starCount={10}
                            value={overallRate}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="col-md-2">
                        <span>{this.state.overallRate}/10</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <h5>Graphics</h5>
                    </div>
                    <div className="col-md-4">
                        <StarRatingComponent 
                            name="graphicsRate" 
                            starCount={10}
                            value={graphicsRate}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="col-md-2">
                        <span>{this.state.graphicsRate}/10</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <h5>Story</h5>
                    </div>
                    <div className="col-md-4">
                        <StarRatingComponent 
                            name="storyRate" 
                            starCount={10}
                            value={storyRate}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="col-md-2">
                        <span>{this.state.storyRate}/10</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <h5>Cinematics</h5>
                    </div>
                    <div className="col-md-4">
                        <StarRatingComponent 
                            name="cinematicsRate" 
                            starCount={10}
                            value={cinematicsRate}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="col-md-2">
                        <span>{this.state.cinematicsRate}/10</span>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-4">
                        <h5>Music</h5>
                    </div>
                    <div className="col-md-4">
                        <StarRatingComponent 
                            name="musicRate" 
                            starCount={10}
                            value={musicRate}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="col-md-2">
                        <span>{this.state.musicRate}/10</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <h5>Content</h5>
                    </div>
                    <div className="col-md-4">
                        <StarRatingComponent 
                            name="contentRate" 
                            starCount={10}
                            value={contentRate}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="col-md-2">
                        <span>{this.state.contentRate}/10</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <h5>Controls</h5>
                    </div>
                    <div className="col-md-4">
                        <StarRatingComponent 
                            name="controlsRate" 
                            starCount={10}
                            value={controlsRate}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="col-md-2">
                        <span>{this.state.controlsRate}/10</span>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-4">
                        <h5>Gameplay</h5>
                    </div>
                    <div className="col-md-4">
                        <StarRatingComponent 
                            name="gameplayRate" 
                            starCount={10}
                            value={gameplayRate}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>
                    <div className="col-md-2">
                        <span>{this.state.gameplayRate}/10</span>
                    </div>
                </div>

                <hr/>
                <div className="form-group">
                    <textarea 
                        onChange={this.handleTextAreaInputChange}
                        className="form-control" rows = "5" cols = "50" name="description" 
                        placeholder="Other Parameters... (Complexity, Luck vs. Skill, Game Mechanics, Uniqueness, Game Idea)">
                    </textarea>
                </div>

                <div className="form-group">
                    <Button onClick={this.submitRating.bind(this)} variant="primary">Submit Rating</Button>
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

export default connect(mapStateToProps, matchDispatchToProps)(RateGame);