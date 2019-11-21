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



function ItemDetails({getData, id}) {
    let [item, setItem] = useState(null);
    let [loading, setLoad] = useState(true);
    let [error, setError] = useState(false);
   
    let updateItem = () => {
        
        //const {getData} = this.props;
        //const {id} = this.props;
            if(!id) {
                return;
            }
            getData(id)
            .then(setItem(item))
            .catch(setError(false));
           //this.foo.bar = 0;
    }

    useEffect((prevProps, props) => {
        if(props.id !== prevProps.id) {
            setLoad(true)
            updateItem();
        }
    },[{item}])
    // componentDidMount() {
    //     this.updateItem();
    // }

    // componentDidUpdate(prevProps) {
    //     if(this.props.id !== prevProps.id) {
    //         this.setState({
    //             loading: true
    //         });
    //         this.updateItem();
    //     }
    // }

    // onError = (err) => {
    //     this.setState({
    //         error: true,
    //         loading: false
    //     })
    // }

    // onItemLoaded = (item) => {
    //     this.setState({
    //         item,
    //         loading: false
    //     })
    // }

    

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
        
        const {name} = item;
        return (
            <div className="char-details rounded"> 
                <h4>{name}</h4>
                    <ul className="list-group list-group-flush"> 
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                    </ul>
            </div>
        );
    
}
export default ItemDetails;