import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../errorMessage';
import {CharactersPage, BooksPage, HousesPage, BooksItem, RandomChar} from '../pages';
import StartPage from '../pages/StartPage';
import gotService from '../../services/gotService';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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
            <Router>
                <div className="app"> 
                    <Container>
                        <Header />
                    </Container>

                    <Container>
                        
                        <Route path='/' exact component={StartPage}/>
                        <Route path='/random-char' exact component={RandomChar}/>
                        <Route path='/characters' exact component={CharactersPage}/>
                        <Route path='/houses' exact component={HousesPage}/>
                        <Route path='/books' exact  component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                return <BooksItem bookId={id}/>
                            }
                            
                        } /> 
                    
                    </Container>
            </div>
        </Router>
        );
    }
};

