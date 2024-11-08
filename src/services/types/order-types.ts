export const ActionTypes = {
    ORDER_REQUEST: 'ORDER_REQUEST',
    ORDER_SUCCESS: 'ORDER_SUCCESS',
    ORDER_ERROR: 'ORDER_ERROR',
    RESET_INGREDIENT_COUNT: 'RESET_INGREDIENT_COUNT',
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

interface IAction<T extends ActionTypes, P = void> {
    type: T;
    payload?: P;
}

export type TOrderActionTypes =
    | IAction<typeof ActionTypes.ORDER_REQUEST>
    | IAction<typeof ActionTypes.ORDER_SUCCESS, number>
    | IAction<typeof ActionTypes.ORDER_ERROR, string>
    | IAction<typeof ActionTypes.RESET_INGREDIENT_COUNT>;

