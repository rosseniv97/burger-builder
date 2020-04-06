import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders'

export const purchasedInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

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
    };
};

const ordersInitStart = () => {
    return {
        type: actionTypes.ORDERS_INIT_START
    }
}

export const ordersInitSuccess = (ordersData)=> {
    return {
        type: actionTypes.ORDERS_INIT_SUCCESS,
        orders: ordersData
    };
};

export const ordersInitFail = (err)=> {
    return {
        type: actionTypes.ORDERS_INIT_FAIL,
        error: err
    };
};

export const ordersFetch = dispatch => {
    return dispatch => {
        dispatch(ordersInitStart());
        axios.get('/orders.json').then(result =>{
            debugger;
            var fetchedOrders = [];
            for(let key in result.data) {
                fetchedOrders.push({
                    ...result.data[key],
                    id: key
                });
            }
            dispatch(ordersInitSuccess(fetchedOrders));
        })
        .catch(err=>{
           dispatch(ordersInitFail(err));
        });
    };
};

