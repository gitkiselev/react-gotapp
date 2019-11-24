import React, {useState, useEffect} from 'react';
import './charDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';


const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field}

function ItemDetails({getData, id, children}) {
    let [item, setItem] = useState(null);
    let [loading, setLoad] = useState(true);
    let [error, setError] = useState(false);
   
    let updateItem = () => {
        if(id) {
            getData(id)
            .then(onItemLoaded)
            .then(setLoad)
            .catch(setError(false));
        }      
    }
    console.log(id);
    console.log(item);
    
    useEffect(() => {
            updateItem();
            setLoad(true)
    },[id])
    const onItemLoaded = (item) => {
        setItem(item);
        setLoad(false);
    }
    
        if(!item) {
            return <span className="select-error">
                Please select a character
            </span>
        }
        if (error) {
            return <ErrorMessage/>
        }
        if (loading) {
            return <Spinner/>
        }
        
        //const {name} = item;
        return (
            <div className="char-details rounded"> 
                {/* <h4>{name}</h4> */}
                    <ul className="list-group list-group-flush"> 
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                    </ul>
            </div>
        );
    
}
export default ItemDetails;