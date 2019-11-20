import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
//import ErrorMessage from '../errorMessage';

function ItemList({getData, onItemSelected, renderItem}) {
    const [itemList, updateList] = useState([]);
    //const [error, onError] = useState(false);
    //const [loading, onItemLoaded] = useState(true);
    


    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data)
            })
              
    }, []) 
    
    function renderItems(arr) {
        
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label} 
                </li>
            )
        })
    }

    //const errorMessage = error ? <ErrorMessage /> : null;
    //const spinner = loading ? <Spinner /> : null;
    //const content = !(loading || error) ? this.renderItems(itemList) : null;
    if(!itemList) {
        return <Spinner />
    }
    const items =renderItems(itemList);
    return (
        <ul className=" item-list items-block rounded">
            {items}
        </ul>
    );
    
}

export default ItemList;