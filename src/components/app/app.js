import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
//import styled from "styled-components";
import './app.css';


export default class App extends Component {
    state = {
        visible: true
    }
    
    toggleVisibility =() => {
        this.setState(({visible}) => ({
            visible: !visible
        }));
    }
    render() {
        return (
            <> 
                
                <Container>
                    <Header />
                    
                </Container>
                <Container>
                    <Row>
                        <Col>
                        <button className="btn-toggle" onClick={this.toggleVisibility}>
                            {this.state.visible === true ? 'Hide' : 'Show'}
                        </button>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {this.state.visible ? <RandomChar/> : null}
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
    
};

