import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1,
        }
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                var price =  param[1];
            } else{
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }
    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.onCheckoutCancelledHandler}
                    onCheckoutContinued={this.onCheckoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} render={()=>(<ContactData totalPrice={this.state.totalPrice} ingredients={this.state.ingredients}/>)} />
            </div>
        )
    }
}

export default Checkout;