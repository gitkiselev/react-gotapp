import React, { Component } from "react";
//import './randomChar.css';
import GotService from "../../services/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import styled from "styled-components";
import {withRouter} from 'react-router-dom';

const RandomBlock = styled.div`
  img {
    width: 100%;
  }
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  border-radius: .25rem;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;
const ToggleButton = styled.button`
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    outline: none;
    border: none;
    border-radius: .25rem;
    width: 100px;
    margin-bottom: 15px;
`
const Term = styled.span`
  font-weight: bold;
`;
class RandomChar extends Component {
  gotService = new GotService();

  state = {
    item: {},
    loading: true,
    error: false,
    visible: true
  };
  toggleVisibility = () => {
    this.setState(({visible}) => ({
        visible: !visible
    }));
}
  componentDidMount() {
    this.updateItem();
    this.timerId = setInterval(this.updateItem, 4500);
  }
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  onItemLoaded = item => {
    this.setState({
      item,
      loading: false
    });
  };
  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };
  updateItem = () => {
    //const id = 125463;
    const id = Math.floor(Math.random() * 140 + 25);
    this.gotService
      .getCharacter(id)
      .then(this.onItemLoaded)
      .catch(this.onError);
  };
  render() {
    
    const { item, loading, error, visible } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !visible) ? <View item={item} /> : null;
    //const isVisible = this.state.visible ? <View item={item} /> : null;

    return (
        <div>
    <ToggleButton onClick={this.toggleVisibility}>{this.state.visible ? 'Hide' : 'Show'}</ToggleButton>
      <>
          
        {errorMessage}
        {spinner}
        {content}
      </>
      </div>
    );
  }
}

const View = ({ item }) => {
  const { name, gender, born, died, culture, url } = item;
  return (
      
    <RandomBlock>
      <h4>Random Character: {name}</h4>
      
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <Term>Gender </Term>
          <span>
            {gender}
            {url}
          </span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Born </Term>
          <span>{born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Died </Term>
          <span>{died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Culture </Term>
          <span>{culture}</span>
        </li>
      </ul>
    </RandomBlock>
  );
};

export default withRouter(RandomChar);