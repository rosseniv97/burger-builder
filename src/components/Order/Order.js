import React from 'react'
import classes from './Order.css';
const order = (props) => {
    let ingredients = [];
    for (let key in props.data.ingredients) {
        ingredients.push({
            name: key,
            amount: props.data.ingredients[key]
        });
    }

    const ingredientOutput = ingredients.map(ingredient => (
        <span style={{ 
            textTransform: 'capitalize', 
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
            }}>
            {ingredient.name} ({ingredient.amount})</span>));

    return (
        <div className={classes.Order}>
            Ingredients: {ingredientOutput}
            <p>Price: BGN {props.data.price}</p>
                
        </div>
    )
};
export default order