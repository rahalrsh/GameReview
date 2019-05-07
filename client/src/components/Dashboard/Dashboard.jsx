import React, { Component } from 'react';
import RequireAuth from './../../HOC/RequireAuth';
import axios from 'axios';
import MyGameCard from './MyGameCard';
import { Container, Row, Col, Button } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
      super(props);
      this.state = {
        myGames : [],
      }
    }

    routeChangeGameSummary(game) {
      let path = '/dashboard/game/summary/' + game._id +'/' + game.slug;
      this.props.history.push(path);
    }

    routeChangeCreateGame() {
      let path = '/game/new';
      this.props.history.push(path);
    }

    componentDidMount() {
      axios.get('/api/user/games', {})
      .then((response) => {
        console.log(response);
  
        // TODO: Show message
  
        if(response.data.success) {
          console.log(response.data.payload.myGames);
          this.setState({myGames : response.data.payload.myGames});
          console.log('State Updated with Games');
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
            <h1>Dashboard</h1>

            <Button variant="danger" onClick={()=>{this.routeChangeCreateGame()}}>Create Game</Button>

            <Row>
            {
              this.state.myGames.map((myGame) => {
                return(
                  <Col key={myGame._id} xs="12" sm="4" md="3" lg="2">
                    <div className="clickable" onClick={()=>{this.routeChangeGameSummary(myGame)}}>
                      <MyGameCard game={myGame}></MyGameCard>
                    </div>
                  </Col>
                )
              })
            }
            </Row>

          </Container>
        </div>
      );
    }
  }
  
  export default RequireAuth(Dashboard);
  // export default Dashboard;