import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedChar: null,//130
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
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

        const bookList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => `${name}`}/>
        )

        const bookDetails = (
            <CharDetails charId={this.state.selectedChar}>
                <Field field='name' label='Name' />
                <Field field='numberOfPages' label='NumberOfPages' />
                <Field field='publiser' label='Publiser' />
                <Field field='released' label='Released' />
            </CharDetails>
        )

        return (
            <RowBlock left={bookList} right={bookDetails}/>
        )
    }
}