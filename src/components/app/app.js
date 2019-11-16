import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../header';
import ErrorMessage from '../errorMessage';
import {CharactersPage, BooksPage, HousesPage, BooksItem} from '../pages';
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
                        
                        <Route path='/'   component={StartPage}/>
                        
                        <Route path='/characters'  component={CharactersPage}/>
                        <Route path='/houses'  component={HousesPage}/>
                        <Route path='/books'   component={BooksPage}/>
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

