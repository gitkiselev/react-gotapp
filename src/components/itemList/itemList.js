import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {
    gotService = new gotService();

    state = {
        charList: null,
        error: false,
        loading: true
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList,
                    loading: false
                })
            })
              //this.foo.bar = 0;
            
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    
    

    
    

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(id)}>
                    {item.name} 
                </li>
            )
        })
    }

    render() {
        const {charList, error, loading} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? this.renderItems(charList) : null;

        
        
        

        return (
            <ul className=" item-list  list-group bg-white">
                {errorMessage}
                {spinner}
                {content}
            </ul>
        );
    }
}