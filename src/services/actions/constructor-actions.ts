import {v4 as uuidv4} from 'uuid';
import {TConstructorActionTypes, ActionTypes} from './../types/constructor-types';
import {IIngredient} from './../../components/types/components-types';

export const addIngredient = (item: IIngredient): TConstructorActionTypes => {
    return {
        type: ActionTypes.ADD_INGREDIENT,
        payload: {
            item: {...item, uniqueId: uuidv4()},
        },
    };
};
export const clearConstructor = (): TConstructorActionTypes => {
    return {
        type: ActionTypes.CLEAR_CONSTRUCTOR,
    };
};
export const removeIngredient = (index: number): TConstructorActionTypes => ({
    type: ActionTypes.REMOVE_INGREDIENT,
    payload: index,
});
export const replaceBun = (bun: IIngredient): TConstructorActionTypes => ({
    type: ActionTypes.REPLACE_BUN,
    payload: bun,
});
export const setPrice = (price: number): TConstructorActionTypes => ({
    type: ActionTypes.SET_PRICE,
    payload: price,
});

export const moveIngredient = (dragIndex: number, hoverIndex: number): TConstructorActionTypes => ({
    type: ActionTypes.MOVE_INGREDIENT,
    payload: {dragIndex, hoverIndex},
});
