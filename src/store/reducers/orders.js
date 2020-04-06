import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case actionTypes.PURCHASE_FAIL:
            return {
                ...state,
                loading: false,
                purchased: false,
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDERS_INIT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ORDERS_INIT_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.ORDERS_INIT_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        default:
            return state;
    };
};

export default reducer;