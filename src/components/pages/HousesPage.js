import React, {Component} from 'react';
import ItemList from '../itemList';
import CharDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';
export default class CharacterPage extends Component {
    gotService = new gotService();

    state = {
        selectedHouses: null,//130
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
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

        const housesList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name}) => `${name}`}/>
        )

        const houseDetails = (
            <CharDetails charId={this.state.selectedHouse}
            getData={this.gotService.getHouse}>
                <Field field='name' label='Name' />
                <Field field='region' label='Region' />
                <Field field='words' label='Words' />
                <Field field='titles' label='Titles' />
                <Field field='overlord' label='Overlord'/>
                <Field field='ancestralWeapons' label='AncestralWeapons'/>
            </CharDetails>
        )

        return (
            <RowBlock left={housesList} right={houseDetails}/>
        )
    }
}