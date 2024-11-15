import {IIngredient} from './../../components/types/components-types';
import {TIngredientsActionTypes, ActionTypes} from "../types/ingredients-types";

export interface IIngredientsState {
    ingredients: IIngredient[];
    currentIngredient: IIngredient | null;
    useTab: string;
    request: boolean;
    failed: boolean;
    error: string;
}

export const initialState: IIngredientsState = {
    ingredients: [],
    currentIngredient: null,
    useTab: "Булки",
    request: false,
    failed: false,
    error: ''
};

const ingredientsReducer = (state = initialState, action: TIngredientsActionTypes): IIngredientsState => {
    switch (action.type) {
        case ActionTypes.INGREDIENTS_REQUEST:
            return {
                ...state, request: true, failed: false, error: ''
            };
        case ActionTypes.INGREDIENTS_SUCCESS:
            return {
                ...state, ingredients: action.payload || [], request: false, failed: false, error: ''
            };
        case ActionTypes.INGREDIENTS_ERROR:
            return {
                ...state, request: false, failed: true
            };
        case ActionTypes.SET_CURRENT_INGREDIENT:
            return {
                ...state, currentIngredient: action.payload || null,
            };
        case ActionTypes.CLEAR_CURRENT_INGREDIENT:
            return {
                ...state, currentIngredient: null,
            };
        case ActionTypes.SET_TAB:
            return {
                ...state, useTab: action.payload || '',
            };
        case ActionTypes.INCREMENT_INGREDIENT_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map(ingredient =>
                    ingredient._id === action.payload ? {
                        ...ingredient,
                        count: (ingredient.count ?? 0) + 1
                    } : ingredient
                ),
            };
        case ActionTypes.DECREMENT_INGREDIENT_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map(ingredient =>
                    ingredient._id === action.payload && (ingredient.count ?? 0) > 0 ? {
                        ...ingredient,
                        count: (ingredient.count ?? 0) - 1
                    } : ingredient
                ),
            };
        case ActionTypes.RESET_INGREDIENT_COUNT:
            return {
                ...state,
                ingredients: state.ingredients.map(ingredient => ({
                    ...ingredient,
                    count: 0
                }))
            };
        default:
            return state;
    }
};

export default ingredientsReducer;
