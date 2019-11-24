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
 
  const gotService = new GotService();
  const [visible, toggleVisibility] = useState(true);
  const [loading, onItemLoaded] = useState(true);
  const [item, setItem] = useState(false);
  const [error, onError] = useState(false);
  let timerId;
  
   function updateItem () {
    const id = Math.floor(Math.random() * 140 + 25);
    gotService.getCharacter(id)
    .then((item) => setItem(item))
    .then(onItemLoaded(false))
    .catch(onError(false))
  }
   console.log(item)
  
  // useEffect(() => {
    
  //     let tid = setInterval(updateItem, 2000)
    
  //     return () => {
  //       setItem(false);
  //         clearInterval(tid);
          
  //     };
  //   },[visible]);
  useEffect(() => {
    updateItem();
    timerId = setInterval(updateItem, 2000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

    
  

  
          
  
  
    
    
    
  
  
    const toggle = () => {
      toggleVisibility(!visible);

    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !visible) ? <View  item={item}/> : null;
    
    return (
      
        <div>
      <ToggleButton onClick={toggle}>{visible ? 'Hide' : 'Show'}</ToggleButton>
        {errorMessage}
        {spinner}
        {content} 
      </div>
    );
  
}

const View = (item) => {
  const { name, gender, born, died, culture, url } = item.item;
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