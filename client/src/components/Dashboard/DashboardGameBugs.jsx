import React, { Component } from 'react';
import RequireAuth from './../../HOC/RequireAuth';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';

class DashboardGameBugs extends Component {
    constructor(props) {
      super(props);
      this.state = {
        bugs:[],
      }
    }

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { gameid, gamename } = params;

        axios.get('/api/games/rate/'+gameid+'/bugs/')
        .then((response) => {
            console.log(response);

            if(response.data.success) {
                let bugs = response.data.payload.bugs;
                this.setState({
                    bugs: bugs
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
            <h1>Game Bugs</h1>

            <ul style={{listStyle: 'none'}}>
            {
              this.state.bugs.map((bug) => {
                return(
                  <li key={bug._id}>
                    <div>
                        <div>
                            <strong>{bug.title}</strong>
                        </div>
                        <div>
                            {bug.description}
                        </div>
                        <small> By: {bug.user.name} </small>
                        |
                        <small> Date: {bug.date} </small>
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
  
export default RequireAuth(DashboardGameBugs);