import {ADD_INGREDIENT, REMOVE_INGREDIENT, REPLACE_BUN, SET_PRICE, MOVE_INGREDIENT} from '../actions/action-types';

const initialState = {
    bun: null, ingredients: [], price: null
};

const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state, ingredients: [...state.ingredients, {...action.payload, count: 1}],
            };
        }
        case REMOVE_INGREDIENT:
            return {
                ...state, ingredients: state.ingredients.filter((_, index) => index !== action.payload),
            };
        case REPLACE_BUN:
            return {
                ...state, bun: action.payload,
            };

        case SET_PRICE:
            return {
                ...state, price: action.payload,
            };

        case MOVE_INGREDIENT: {
            const {dragIndex, hoverIndex} = action.payload;
            const newIngredients = [...state.ingredients];
            const [movedItem] = newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, movedItem);
            return {
                ...state, ingredients: newIngredients,
            };
        }

        default:
            return state;
    }
};

export default constructorReducer;
