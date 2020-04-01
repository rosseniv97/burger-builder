import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
    salad: 1,
    meat: 2,
    bacon: 2,
    cheese: 2
}

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        meat: 0,
        cheese: 0
    },
    totalPrice: 4,
    purchasable: false
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
    }

}

const reducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            newState = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updatePurchaseState(newState);

        case actionTypes.REMOVE_INGREDIENT:
            newState = {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
            return updatePurchaseState(newState);

        case actionTypes.CLEAR_STATE:
            newState = {
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
        default:
            return state;
    }
};

export default reducer;