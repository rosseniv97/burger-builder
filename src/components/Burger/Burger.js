import React from 'react';
import { connect } from 'react-redux';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
const burger = (props)=>{

    let trasnformedIngredients = Object.keys(props.ings)
    .map(igKey=>{
               return [...Array(props.ingredients[igKey])].map((_,index)=>{
                   return <BurgerIngredient key={igKey + index} type={igKey}/>
               }) 
          }).reduce((prevEl,currEl)=>{
               return [...prevEl,...currEl]; 
          },[])
    
    if(trasnformedIngredients.length===0){
        trasnformedIngredients=<p>Put some ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {trasnformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

export default connect(mapStateToProps)(burger);