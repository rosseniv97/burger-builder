import React, { Component } from 'react';
import Aux from '../hoc/Auxilary';
import Burger from '../components/Burger/Burger'
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../../src/components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummery/OrderSummary'
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
const INGREDIENT_PRICES = {
    salad: 1,
    meat: 2,
    bacon: 2,
    cheese: 2
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-my-burger-58e4d.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(err => {
                this.setState({ error: err })
            })
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
        //alert("Continue");
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    addIngredientHandler = (type) => {
        const newValue = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newValue

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice

        });
        this.updatePurchaseState();
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }
        const newValue = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newValue

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState();
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let ingr in disabledInfo) {
            disabledInfo[ingr] = disabledInfo[ingr] <= 0;
        }
        let orderSummary = null;

        if (this.state.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler }
                    price={this.state.totalPrice}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        let burger = this.state.error ? <p>Cannot fetch ingredients from server!</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        removeIngredient={this.removeIngredientHandler}
                        addIngredient={this.addIngredientHandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
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
export default withErrorHandler(BurgerBuilder, axios);