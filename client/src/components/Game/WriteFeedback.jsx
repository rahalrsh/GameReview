import React from 'react';
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import './WriteFeedback.css'
import RateGame from './Feedback/RateGame';
import FeedbackGame from './Feedback/FeedbackGame';
import ReportGameBug from './Feedback/ReportGameBug';

const WriteFeedback = (props) => {
    return(
        <div className="feed-back-wrapper">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Rate Game</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Feedback</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Report Bug</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <RateGame game={props.game}></RateGame>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <FeedbackGame game={props.game}></FeedbackGame>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <ReportGameBug game={props.game}></ReportGameBug>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default WriteFeedback;