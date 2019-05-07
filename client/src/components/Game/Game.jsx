import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import GameDetails from './GameDetails';
import WriteFeedback from './WriteFeedback';
import CommentGame from './Feedback/CommentGame';


// /game/:gameid/:gamenameslug
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {
                coverImage: {},
                screenshotImages: [],
                meta: {},
                user: {},
                comments: []
            }
        }
    }
    
    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { gameid, gamename } = params;

        axios.get('/api/games/' + gameid)
        .then(response => {
          console.log(response);
          // TODO: Show message
          if(response.data.success) {
            console.log(response.data.payload.game);
            const { game } = response.data.payload;

            this.setState({
                game: game,
            });
          }
          if(!response.data.success) {
            // this.props.addFlashMessage({flashMessageType: 'Error', flashMessageText: response.data.message});
          }
        })
        .catch( (error) => {
          console.log(error);
        });
    }

    onNewCommentAdded = (newlyAddedComment) => {
        let game = Object.assign({}, this.state.game);
        game.comments.unshift(newlyAddedComment);

        this.setState({
            game: game
        });
    }

    render() {
        return (
            <div>
                <Container>
                    <GameDetails game={this.state.game}></GameDetails>
                    <WriteFeedback game={this.state.game}></WriteFeedback>
                    <hr/>
                    <CommentGame game={this.state.game} onNewCommentAdded={this.onNewCommentAdded}></CommentGame>
                </Container>
            </div>
        );
    }
}
  
export default Game;