import React, { Component } from 'react';
import RequireAuth from './../../HOC/RequireAuth';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

class DashboardGameSummary extends Component {
    constructor(props) {
      super(props);
      this.state = {
        summary:{},
        game:{}
      }
    }

    routeChangeGameRatings() {
        let path = '/dashboard/game/ratings/' + this.state.game._id +'/' + this.state.game.slug;
        this.props.history.push(path);
    }

    routeChangeGameFeedbacks() {
        let path = '/dashboard/game/feedbacks/' + this.state.game._id +'/' + this.state.game.slug;
        this.props.history.push(path);
    }

    routeChangeGameBugs() {
        let path = '/dashboard/game/bugs/' + this.state.game._id +'/' + this.state.game.slug;
        this.props.history.push(path);
    }

    routeChangeGameComments() {
        let path = '/dashboard/game/comments/' + this.state.game._id +'/' + this.state.game.slug;
        this.props.history.push(path);
    }

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { gameid, gamename } = params;

        // axios.get('/api/games/rate/'+gameid+'/ratings/')
        axios.get('/api/games/' + gameid + '/summary')
        .then((response) => {
            console.log(response);

            if(response.data.success) {
                let summary = response.data.payload.summary;
                let game    = response.data.payload.game;
                this.setState({
                    summary: summary,
                    game: game
                });

                // console.log(response.data.payload.myGames);
                // this.setState({myGames : response.data.payload.myGames});
                // console.log('State Updated with Games');
            }
            if(!response.data.success) {
                // this.props.addFlashMessage({flashMessageType: 'Error', flashMessageText: response.data.message});
            }
        })
        .catch( (error) => {
            console.log(error);
        });
    }

    render() {
      return (
        <div>
          <Container>
            <h1>Game Summary</h1>

            <Button variant="danger" onClick={()=>{this.routeChangeGameRatings()}}>Rating: {this.state.summary.rating}%</Button>
            <Button variant="danger" onClick={()=>{this.routeChangeGameFeedbacks()}}>Feedbacks: {this.state.summary.feedback}</Button>
            <Button variant="danger" onClick={()=>{this.routeChangeGameBugs()}}>Bugs: {this.state.summary.bugs}</Button>
            <Button variant="danger" onClick={()=>{this.routeChangeGameComments()}}>Comments: {this.state.summary.comments}</Button>
        

          </Container>
        </div>
      );
    }
}
  
export default RequireAuth(DashboardGameSummary);