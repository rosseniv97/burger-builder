import React from 'react'
import Aux from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button'
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
            <p><strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to Chekout?</p>
            <Button btnType='Danger' clicked={props.cancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continue} >CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;