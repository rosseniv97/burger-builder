import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirects, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/checkout/ContactData/ContactData';

class Checkout extends Component {

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />
        let purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        let nullProp = null;
        for (let key in this.props.ings) {
            if (this.props.ings[key]) nullProp = 1;
        }
        if (nullProp) {
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.onCheckoutCancelledHandler}
                        onCheckoutContinued={this.onCheckoutContinuedHandler} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);