export const ActionTypes = {
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE',
    TOKEN_REFRESH_REQUEST: 'TOKEN_REFRESH_REQUEST',
    TOKEN_REFRESH_SUCCESS: 'TOKEN_REFRESH_SUCCESS',
    TOKEN_REFRESH_FAILURE: 'TOKEN_REFRESH_FAILURE',
    SET_EMAIL_LOGIN: 'SET_EMAIL_LOGIN',
    SET_PASSWORD_LOGIN: 'SET_PASSWORD_LOGIN',
    SET_EMAIL_REGISTER: 'SET_EMAIL_REGISTER',
    SET_PASSWORD_REGISTER: 'SET_PASSWORD_REGISTER',
    SET_NAME_REGISTER: 'SET_NAME_REGISTER',
    GET_USER_REQUEST: 'GET_USER_REQUEST',
    GET_USER_SUCCESS: 'GET_USER_SUCCESS',
    GET_USER_FAILURE: 'GET_USER_FAILURE',
    UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
    FORGOT_PASSWORD_VISITED: 'FORGOT_PASSWORD_VISITED',
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

interface IAction<T extends ActionTypes, P = void> {
    type: T;
    payload?: P;
}

export type TAuthActionTypes =
    | IAction<typeof ActionTypes.SET_EMAIL_REGISTER, string>
    | IAction<typeof ActionTypes.SET_PASSWORD_REGISTER, string>
    | IAction<typeof ActionTypes.SET_NAME_REGISTER, string>
    | IAction<typeof ActionTypes.SET_EMAIL_LOGIN, string>
    | IAction<typeof ActionTypes.SET_PASSWORD_LOGIN, string>
    | IAction<typeof ActionTypes.REGISTER_REQUEST>
    | IAction<typeof ActionTypes.REGISTER_SUCCESS, { user: any; accessToken: string; refreshToken: string }>
    | IAction<typeof ActionTypes.REGISTER_FAILURE, string>
    | IAction<typeof ActionTypes.LOGIN_REQUEST>
    | IAction<typeof ActionTypes.LOGIN_SUCCESS, { user: any; accessToken: string; refreshToken: string }>
    | IAction<typeof ActionTypes.LOGIN_FAILURE, string>
    | IAction<typeof ActionTypes.LOGOUT_REQUEST>
    | IAction<typeof ActionTypes.LOGOUT_SUCCESS>
    | IAction<typeof ActionTypes.LOGOUT_FAILURE, string>
    | IAction<typeof ActionTypes.TOKEN_REFRESH_REQUEST>
    | IAction<typeof ActionTypes.TOKEN_REFRESH_SUCCESS, { accessToken: string; refreshToken: string }>
    | IAction<typeof ActionTypes.TOKEN_REFRESH_FAILURE, string>
    | IAction<typeof ActionTypes.FORGOT_PASSWORD_VISITED>;