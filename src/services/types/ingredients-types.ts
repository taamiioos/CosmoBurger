import {IIngredient} from './../../components/types/components-types';

export const ActionTypes = {
    SET_TAB: 'SET_TAB',
    SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT',
    CLEAR_CURRENT_INGREDIENT: 'CLEAR_CURRENT_INGREDIENT',
    INCREMENT_INGREDIENT_COUNT: 'INCREMENT_INGREDIENT_COUNT',
    DECREMENT_INGREDIENT_COUNT: 'DECREMENT_INGREDIENT_COUNT',
    INGREDIENTS_REQUEST: 'INGREDIENTS_REQUEST',
    INGREDIENTS_SUCCESS: 'INGREDIENTS_SUCCESS',
    INGREDIENTS_ERROR: 'INGREDIENTS_ERROR',
    RESET_INGREDIENT_COUNT: 'RESET_INGREDIENT_COUNT',
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

interface IAction<T extends ActionTypes, P = void> {
    type: T;
    payload?: P;
}

export type TIngredientsActionTypes =
    | IAction<typeof ActionTypes.SET_TAB, string>
    | IAction<typeof ActionTypes.SET_CURRENT_INGREDIENT, IIngredient>
    | IAction<typeof ActionTypes.CLEAR_CURRENT_INGREDIENT>
    | IAction<typeof ActionTypes.INCREMENT_INGREDIENT_COUNT, string>
    | IAction<typeof ActionTypes.DECREMENT_INGREDIENT_COUNT, string>
    | IAction<typeof ActionTypes.INGREDIENTS_REQUEST>
    | IAction<typeof ActionTypes.INGREDIENTS_SUCCESS, IIngredient[]>
    | IAction<typeof ActionTypes.INGREDIENTS_ERROR, string>
    | IAction<typeof ActionTypes.RESET_INGREDIENT_COUNT>;


