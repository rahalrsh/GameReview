import React from 'react';
import { Card } from 'react-bootstrap';

const GameDetails = (props) => {
    return(
        <div>
            <div style={{textAlign: 'center', paddingTop: '1em', paddingBottom: '1.5em'}}>
                <h1>{props.game.title}</h1>
            </div>
            <div className='row'>
                <div className='col-md-7'>
                    <img style={{width: '100%'}} 
                    src={props.game.coverImage.path} 
                    alt=''/>
                </div>
                <div className='col-md-5'>
                    <div dangerouslySetInnerHTML={{ __html: props.game.longDescription }}/>

                    <table>
                        <tbody>
                            <tr>
                                <td><i className="fas fa-heart" style={{ color: 'Red' }}></i></td>
                                <td>&nbsp;&nbsp;{props.game.meta.favs}</td>
                            </tr>
                            <tr>
                                <td><i className="fas fa-gamepad"></i></td>
                                <td>&nbsp;&nbsp;{props.game.meta.votes}%</td>
                            </tr>
                            <tr>
                                <td>Author:</td>
                                <td>&nbsp;&nbsp;{props.game.user.name}</td>
                            </tr>
                            <tr>
                                <td>Genre:</td>
                                <td>&nbsp;&nbsp;{props.game.user.genre}</td>
                            </tr>
                            <tr>
                                <td>Created:</td>
                                <td>&nbsp;&nbsp;{props.game.user.date}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-7'>
                    {
                        props.game.screenshotImages.map((image) => {
                            return(
                                <img style={{width: '30%', margin: '5px'}} 
                                    key={image._id}
                                    src={image.path} 
                                    className="img-rounded" 
                                    alt="screenshot" 
                                />
                            )
                        })
                    }
                </div>
                <div className='col-md-5'>
                    <iframe 
                        width='420' height='315'
                        src={props.game.trailer}>
                    </iframe>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;