import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 1,
    meat: 2,
    bacon: 2,
    cheese: 2
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false
};

const updatePurchaseState = (state) => {

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
    if (sum >= 2) return {
        ...state,
        purchasable: true
    }
    else return {
        ...state,
        purchasable: false
    };

};

const addIngredient = (state, action) => {
    const newState = {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatePurchaseState(newState);
};

const removeIngredient = (state, action) => {
    const newState = {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    };
    return updatePurchaseState(newState);
};

const clearState = (state) => {
    const newState = {
        ...state,
        ingredients: {
            ...state.ingredients,

        }
    };
    for (let key in newState.ingredients)
        newState.ingredients[key] = 0;
    newState.totalPrice = 0;
    newState.purchasable = false;
    return newState;
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);

        case actionTypes.CLEAR_STATE:
            return clearState(state);

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };

        default:
            return state;
    }
};

export default reducer;