import React, { Component } from 'react';
import RequireAuth from './../../HOC/RequireAuth';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

class DashboardGameComments extends Component {
    constructor(props) {
      super(props);
      this.state = {
        comments:[],
      }
    }

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { gameid, gamename } = params;

        axios.get('/api/games/rate/'+gameid+'/comments/')
        .then((response) => {
            console.log(response);

            if(response.data.success) {
                let comments = response.data.payload.comments;
                this.setState({
                    comments: comments
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
            <h1>Game Comments</h1>

            <ul style={{listStyle: 'none'}}>
            {
              this.state.comments.map((comment) => {
                return(
                  <li key={comment._id}>
                    <div>
                        <div>
                            {comment.comment}
                        </div>
                        <small> By: {comment.user.name} </small>
                        |
                        <small> Date: {comment.date} </small>
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
  
export default RequireAuth(DashboardGameComments);