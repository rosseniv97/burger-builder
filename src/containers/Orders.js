import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../components/Order/Order';
import * as actions from '../store/actions/index';
import Spinner from '../components/UI/Spinner/Spinner';
import axios from '../axios-orders';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler'
class Orders extends Component {

    componentDidMount() {
        this.props.onOrdersFetch(this.props.token);
    }
    render() {
        let orders = this.props.loading ? <Spinner /> : (
            <div>
                {this.props.orders.map(order =>
                    (<Order key={order.id} data={order} />))}
            </div>
        );
        return orders;
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetch: (token) => dispatch(actions.ordersFetch(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));