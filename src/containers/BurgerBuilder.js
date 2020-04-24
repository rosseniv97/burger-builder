import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../hoc/Auxilary';
import Burger from '../components/Burger/Burger'
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../../src/components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummery/OrderSummary'
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../store/actions/index';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();  
    }

    purchaseContinueHandler = () => {
        this.props.purchasedInit();
        this.props.history.push({pathname: '/checkout'});
    }

    ToAuthentication = () => {
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push("/auth");
    }
    
    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }
    purchaseCancelHandler = ()=> {
        this.setState({
            purchasing: false
        })
        this.props.history.push({pathname: '/'});
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let ingr in disabledInfo) {
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        }
        let orderSummary = null;

        if (this.props.ings) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    continue={this.purchaseContinueHandler }
                    cancel={this.purchaseCancelHandler}
                    price={this.props.price}
                />
            );
        }

        let burger = this.props.error ? <p>Cannot fetch ingredients from server!</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        removeIngredient={this.props.onIngredientRemoved}
                        addIngredient={this.props.onIngredientAdded}
                        disabled={disabledInfo}
                        totalPrice={this.props.price}
                        purchasable={this.props.purchasable}
                        toAuthentication={this.ToAuthentication}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchasable,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName)=> dispatch (actionCreators.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=> dispatch (actionCreators.removeIngredient(ingName)),
        onInitIngredients: () => dispatch (actionCreators.initIngredients()),
        purchasedInit: () => dispatch (actionCreators.purchaseBurger()),
        onSetAuthRedirectPath: (path)=> dispatch(actionCreators.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));