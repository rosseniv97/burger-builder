import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders'

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_FAIL,
        error: error
    };
};

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err));
            });
    }
}

export const purchasedInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}