import {ADD_INGREDIENT, REMOVE_INGREDIENT, REPLACE_BUN, SET_PRICE, MOVE_INGREDIENT} from './action-types';

export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT, payload: ingredient
});
export const removeIngredient = (index) => ({
    type: REMOVE_INGREDIENT, payload: index
});
export const replaceBun = (bun) => ({
    type: REPLACE_BUN, payload: bun
});
export const setPrice = (price) => ({
    type: SET_PRICE, payload: price
});
export const moveIngredient = (dragIndex, hoverIndex) => ({
    type: MOVE_INGREDIENT,
    payload: {dragIndex, hoverIndex}
});
