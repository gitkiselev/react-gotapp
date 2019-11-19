import React, {Component} from 'react';
import gotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';


export default class BooksItem extends Component {
    gotService = new gotService();


    render() {
        return(
            <ItemDetails id={this.props.bookId}
            getData={this.gotService.getBook}>
                <Field field='name' label='Name' />
                <Field field='numberOfPages' label='Number of Pages' />
                <Field field='publiser' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    }
}