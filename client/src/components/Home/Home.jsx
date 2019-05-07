import React, { Component } from 'react';
import axios from 'axios';
import GameCard from './GameCard';
import { Container, Row, Col } from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
      super(props);

      this.state = {
        games : [],
      }
    }

    goToGame(game) {
      this.props.history.push("/game/"+game._id+"/"+game.slug);
    }

    componentDidMount() {
      // axios.get('/api/games/', {})
      axios.get('/api/games', {})
      .then((response) => {
        console.log(response);
  
        // TODO: Show message
  
        if(response.data.success) {
          console.log(response.data.payload.games);
          this.setState({games : response.data.payload.games});
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
        <div className="App" style={{paddingTop: '10px'}}>
          <Container>
            <ul style={{listStyle: 'none'}}>
            {
              this.state.games.map((game) => {
                return(
                  <li onClick={() => this.goToGame(game)} key={game._id}>
                    <GameCard game={game}></GameCard>
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
  
  export default Home;