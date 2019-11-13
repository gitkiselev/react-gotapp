import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false,
        loading: true
    }

    componentDidMount() {
        const {getData} = this.props;
        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
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
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label} 
                </li>
            )
        })
    }

    render() {
        const {itemList, error, loading} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? this.renderItems(itemList) : null;

        return (
            <ul className=" item-list items-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </ul>
        );
    }
}