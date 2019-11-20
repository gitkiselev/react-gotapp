import React, {useState, useEffect} from "react";
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
`;
const Term = styled.span`
  font-weight: bold;
`;

function RandomChar() {
  GotService = new GotService();
  
  const [loading, onItemLoaded] = useState(true);
  const [visible, toggleVisibility] = useState(true);
  let itemRandom;
  
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [born, setBorn] = useState(null);
  const [died, setDied] = useState(null);
  const [culture, setCulture] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, onError] = useState(false);
  
  let updateItem = () => {
    const id = Math.floor(Math.random() * 140 + 25);
    GotService.getCharacter(id)
    .then(onItemLoaded(false))
    //.then(onItem(item))
    .then(setName(name))
    .then(setGender(gender))
    .then(setBorn(born))
    .then(setDied(died))
    .then(setCulture(culture))
    .then(setUrl(url))
    .then((item) => {
      itemRandom = item;
      console.log(itemRandom);
    })
    .catch(onError(false))
  }

  useEffect(() => {
    let timerId = setInterval(updateItem, 2000);
    return () => {
      clearInterval(timerId);
    }
  }, [visible]);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !visible) ? <View item={item}/> : null;
    
    return (
      
        <div>
      <ToggleButton onClick={() => toggleVisibility(!visible)}>{visible ? 'Hide' : 'Show'}</ToggleButton>
        {errorMessage}
        {spinner}
        {content} 
      
      </div>
    );
  
}

const View = (item) => {
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