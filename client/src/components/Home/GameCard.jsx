import React from 'react';
import { Card } from 'react-bootstrap';
import './GameCard.css';

const GameCard = (props) => {
    return(
        <div className="card game-card">                
                <img className="same-size-img " src={ props.game.coverImage.path } alt="" />
                
                <div>
                    <h5>{props.game.title}</h5>
                    <div className="game-text">{props.game.description}</div>
                </div>
            

            {/* <div className="row no-gutters">
                <div className="col-md-2 col-sm-2 col-xs-2">
                    <img src={ props.game.coverImage.path } className="same-size-img" alt="" />
                </div>
                <div className="col-md-10 col-sm-10 col-xs-10">
                    <div className="card-block px-2">
                        <h5>{props.game.title}</h5>
                        <div className="game-text">{props.game.description}</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}


export default GameCard;