import {IIngredient} from './../../components/types/components-types';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../reducers/root-reducer';
import {request} from '../../api/request-response';
import {TIngredientsActionTypes, ActionTypes} from './../types/ingredients-types';

export const setIngredients = (): ThunkAction<Promise<void>, RootState, unknown, TIngredientsActionTypes> => {
    return async (dispatch) => {
        dispatch({type: ActionTypes.INGREDIENTS_REQUEST});
        try {
            const res = await request('/ingredients');
            dispatch({
                type: ActionTypes.INGREDIENTS_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: ActionTypes.INGREDIENTS_ERROR,
                payload: (error as Error).message,
            });
        }
    };
};

export const incrementIngredientCount = (ingredientId: string): TIngredientsActionTypes => ({
    type: ActionTypes.INCREMENT_INGREDIENT_COUNT,
    payload: ingredientId,
});

export const decrementIngredientCount = (ingredientId: string): TIngredientsActionTypes => ({
    type: ActionTypes.DECREMENT_INGREDIENT_COUNT,
    payload: ingredientId,
});

export const setCurrentIngredient = (ingredient: IIngredient): TIngredientsActionTypes => ({
    type: ActionTypes.SET_CURRENT_INGREDIENT,
    payload: ingredient,
});

export const clearCurrentIngredient = (): TIngredientsActionTypes => ({
    type: ActionTypes.CLEAR_CURRENT_INGREDIENT,
});

export const setTab = (tab: string): TIngredientsActionTypes => ({
    type: ActionTypes.SET_TAB,
    payload: tab,
});
