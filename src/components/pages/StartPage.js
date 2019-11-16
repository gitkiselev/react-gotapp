import React, {Component} from 'react';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

import './css/main.css';

class StartPage extends Component {
    gotService = new gotService();

    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if(this.state.error) {
            return <ErrorMessage />
        }

        return (
            <>
            <div>
                <p className="main-title">Главная страница</p>
                <p className="main-title">Воспользуйтесь ссылками для перехода на соответствующие разделы</p>
            </div>
            
            </>
        )
    }
}

export default withRouter(StartPage);