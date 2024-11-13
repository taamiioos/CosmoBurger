export const ActionTypes = {
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAILURE: 'GET_USER_FAILURE',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

interface IAction<T extends ActionTypes, P = void> {
    type: T;
    payload?: P;
}

export type TProfileActionTypes =
    | IAction<typeof ActionTypes.GET_USER_REQUEST>
    | IAction<typeof ActionTypes.GET_USER_SUCCESS, { email: string; name: string }>
    | IAction<typeof ActionTypes.GET_USER_FAILURE, string>
    | IAction<typeof ActionTypes.UPDATE_USER_REQUEST>
    | IAction<typeof ActionTypes.UPDATE_USER_SUCCESS, { email: string; name: string }>
    | IAction<typeof ActionTypes.UPDATE_USER_FAILURE, string>;
