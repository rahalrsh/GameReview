import React, { Component } from 'react';
import RequireAuth from './../../HOC/RequireAuth';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

class DashboardGameFeedbacks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        feedbacks:[],
      }
    }

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { gameid, gamename } = params;

        axios.get('/api/games/rate/'+gameid+'/feedbacks/')
        .then((response) => {
            console.log(response);

            if(response.data.success) {
                let feedbacks = response.data.payload.feedbacks;
                this.setState({
                    feedbacks: feedbacks
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
            <h1>Game Feedbacks</h1>

            <ul style={{listStyle: 'none'}}>
            {
              this.state.feedbacks.map((feedback) => {
                return(
                  <li key={feedback._id}>
                    <div>
                        <div>
                            Feedback: {feedback.feedback}
                        </div>
                        <small> By: {feedback.user.name} </small>
                        |
                        <small> Date: {feedback.date} </small>
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
  
export default RequireAuth(DashboardGameFeedbacks);