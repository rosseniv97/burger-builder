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
import * as actionTypes from '../store/actions';

const INGREDIENT_PRICES = {
    salad: 1,
    meat: 2,
    bacon: 2,
    cheese: 2
}

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        debugger;
       /*  axios.get('https://react-my-burger-58e4d.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(err => {
                this.setState({ error: err })
            }) */
    }

    updatePurchaseState = () => {

        this.setState((state, props) => {

            const ingredients = {
                ...state.ingredients
            };
            const ingrs = Object.keys(ingredients);
            const amounts = ingrs.map(ingrKey => {
                return ingredients[ingrKey];
            })
            const sum = amounts.reduce((prev, curr) => {
                return prev + curr;
            }, 0);
            if (sum >= 2) return { purchasable: true }
            else return { purchasable: false }
        });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout'});
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
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler }
                    price={this.props.price}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.state.error ? <p>Cannot fetch ingredients from server!</p> : <Spinner />
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
        ings: state.ingredients,
        price: state.totalPrice,
        purchasable: state.purchasable
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName)=> dispatch ({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName)=> dispatch ({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));