import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharactersPage from '../pages/CharactersPage';
import BooksPage from '../pages/BooksPage';
import HousesPage from '../pages/HousesPage';
//import ItemList from '../itemList';
//import CharDetails from '../itemDetails';
import gotService from '../../services/gotService';
//import styled from "styled-components";
import './app.css';


export default class App extends Component {
    gotService = new gotService();

    state = {
        visible: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }
    
    toggleVisibility =() => {
        this.setState(({visible}) => ({
            visible: !visible
        }));
    }

    

    render() {

        if(this.state.error) {
            return <ErrorMessage />
        }
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
                        <Col lg={{size: 6, offset: 0}}>
                            {this.state.visible ? <RandomChar/> : null}
                        </Col>
                    </Row>
                <CharactersPage /> 
                <BooksPage />
                <HousesPage />
                </Container>
            </>
        );
    }
};

