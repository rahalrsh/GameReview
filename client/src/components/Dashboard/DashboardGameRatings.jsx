import React, { Component } from 'react';
import RequireAuth from './../../HOC/RequireAuth';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

class DashboardGameSummary extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ratings:[],
      }
    }

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { gameid, gamename } = params;

        axios.get('/api/games/rate/'+gameid+'/ratings/')
        .then((response) => {
            console.log(response);

            if(response.data.success) {
                let ratings = response.data.payload.ratings;
                this.setState({
                    ratings: ratings
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

    render() {
      return (
        <div>
          <Container>
            <h1>Game Ratings</h1>

            <ul style={{listStyle: 'none'}}>
            {
              this.state.ratings.map((rating) => {
                return(
                  <li key={rating._id}>
                    <div>
                        <div>
                            <strong>  Overall Rating: {rating.overallRate} </strong>
                        </div>
                        <div>
                            Graphics: {rating.graphicsRate}
                        </div>
                        <div>
                            Story: {rating.storyRate}
                        </div>
                        <div>
                            Cinematics: {rating.cinematicsRate}
                        </div>
                        <div>
                            Music: {rating.musicRate}
                        </div>
                        <div>
                            Content: {rating.contentRate}
                        </div>
                        <div>
                            Controls: {rating.controlsRate}
                        </div>
                        <div>
                            Gameplay: {rating.gameplayRate}
                        </div>
                        <div>
                            Other: {rating.other}
                        </div>
                        <small> By: {rating.user.name} </small>
                        |
                        <small> Date: {rating.date} </small>
                    </div>
                    <hr/>
                  </li>
                )
              })
            }
            </ul>

          </Container>
        </div>
      );
    }
}
  
export default RequireAuth(DashboardGameSummary);