import React from 'react';
import { connect } from 'react-redux';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
const controls=[
    {label: "Salad", type:'salad'},
    {label: "Bacon", type:'bacon'}, 
    {label: "Cheese", type:'cheese'},
    {label: "Meat", type:'meat'}
];
const buildControls = (props)=>{
    let button = props.isAuthenticated
        ? (<button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered} >Order Now</button>)
        : (<button className={classes.OrderButton} onClick={props.toAuthentication} >Go to sign in</button>)
    return (
        <div className={classes.BuildControls}>
            <p>Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(ctrl=>(
                <BuildControl key={ctrl.label} 
                    label={ctrl.label} 
                    removeIngredient={()=>{ props.removeIngredient(ctrl.type)}}
                    addIngredient={()=>{ props.addIngredient(ctrl.type)}}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            {button}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token!==null
    };
};

export default connect(mapStateToProps)(buildControls)