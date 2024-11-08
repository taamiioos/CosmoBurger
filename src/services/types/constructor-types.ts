import {IIngredient} from './../../components/types/components-types';

export const ActionTypes = {
    ADD_INGREDIENT: 'ADD_INGREDIENT',
    REMOVE_INGREDIENT: 'REMOVE_INGREDIENT',
    REPLACE_BUN: 'REPLACE_BUN',
    SET_PRICE: 'SET_PRICE',
    MOVE_INGREDIENT: 'MOVE_INGREDIENT',
    CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR',
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

interface IAction<T extends ActionTypes, P = void> {
    type: T;
    payload?: P;
}

export type TConstructorActionTypes =
    | IAction<typeof ActionTypes.ADD_INGREDIENT, { item: IIngredient & { uniqueId: string } }>
    | IAction<typeof ActionTypes.REMOVE_INGREDIENT, number>
    | IAction<typeof ActionTypes.REPLACE_BUN, IIngredient>
    | IAction<typeof ActionTypes.SET_PRICE, number>
    | IAction<typeof ActionTypes.MOVE_INGREDIENT, { dragIndex: number; hoverIndex: number }>
    | IAction<typeof ActionTypes.CLEAR_CONSTRUCTOR>;

