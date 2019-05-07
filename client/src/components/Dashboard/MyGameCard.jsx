import React from 'react';
import { Card } from 'react-bootstrap';

const MyGame = (props) => {
    return(
        <Card>
            <Card.Img  
                style={{ height: '10rem' }}
                variant="top" 
                src={props.game.coverImage.path }
            />
            <Card.Body>
                <Card.Title>{props.game.title}</Card.Title>
                <div>
                    <i className="fas fa-heart" style={{ color: 'Red' }}></i>
                    <span style={{ marginLeft: '5px' }}>{props.game.meta.favs}</span>
                </div>
                <div>
                    <i className="fas fa-gamepad"></i>
                    <span style={{ marginLeft: '5px' }}>{props.game.meta.votes}%</span>
                </div>
                <div>
                    <i className="fas fa-comment-alt"></i>
                    <span style={{ marginLeft: '5px' }}>{Math.floor((Math.random() * 20) + 5)}</span>
                </div>
            </Card.Body>
        </Card>
    );
}


export default MyGame;