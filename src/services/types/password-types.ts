export const ActionTypes = {
    FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST',
    FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_ERROR: 'FORGOT_PASSWORD_ERROR',
    RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_ERROR: 'RESET_PASSWORD_ERROR',
    SET_EMAIL_FORGOT: 'SET_EMAIL_FORGOT',
    SET_PASSWORD_RESET: 'SET_PASSWORD_RESET',
    SET_CODE_RESET: 'SET_CODE_RESET',
} as const;
export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

interface IAction<T extends ActionTypes, P = void> {
    type: T;
    payload?: P;
}

export type TPasswordActionTypes =
    | IAction<typeof ActionTypes.FORGOT_PASSWORD_REQUEST>
    | IAction<typeof ActionTypes.FORGOT_PASSWORD_SUCCESS, { message: string }>
    | IAction<typeof ActionTypes.FORGOT_PASSWORD_ERROR, string>
    | IAction<typeof ActionTypes.RESET_PASSWORD_REQUEST>
    | IAction<typeof ActionTypes.RESET_PASSWORD_SUCCESS, { message: string }>
    | IAction<typeof ActionTypes.RESET_PASSWORD_ERROR, string>
    | IAction<typeof ActionTypes.SET_EMAIL_FORGOT, string>
    | IAction<typeof ActionTypes.SET_PASSWORD_RESET, string>
    | IAction<typeof ActionTypes.SET_CODE_RESET, string>;

