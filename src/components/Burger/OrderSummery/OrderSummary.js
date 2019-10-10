import React from 'react'
// import classes from './Modal.css'
import Aux from '../../../hoc/Aux'
const orderSummary = (props)=>{

    const ingredientSummary =Object.keys(props.ingredients)
        .map(igKey=>{
            return (
            <li key={igKey}><span style={{textTransform: 'capitalize'}}>
                {igKey}:</span> 
                {props.ingredients[igKey]}
            </li>
            );
        })
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Your burgers contains the following: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Chekout?</p>
        </Aux>
    );
}

export default orderSummary;