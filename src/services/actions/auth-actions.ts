import {request} from '../../api/request-response';
import {TAuthActionTypes, ActionTypes} from './../types/auth-types';
import {AppThunk} from '../store';

export const registerUser = (
    email: string,
    password: string,
    name: string
): AppThunk => {
    return async (dispatch) => {
        dispatch({type: ActionTypes.REGISTER_REQUEST});
        try {
            const data = await request('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password, name}),
            });

            if (data.success) {
                dispatch({
                    type: ActionTypes.REGISTER_SUCCESS,
                    payload: {user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken},
                });
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('accessToken', data.accessToken);
            } else if (data.status === 401 || data.status === 403) {
                dispatch({type: ActionTypes.REGISTER_FAILURE, payload: 'Пользователь уже существует'});
            } else {
                dispatch({type: ActionTypes.REGISTER_FAILURE, payload: data.message});
            }
        } catch (error) {
            dispatch({type: ActionTypes.REGISTER_FAILURE, payload: (error as Error).message});
        }
    };
};
export const loginUser = (
    email: string,
    password: string
): AppThunk => {
    return async (dispatch) => {
        dispatch({type: ActionTypes.LOGIN_REQUEST});
        try {
            const data = await request('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (data.success) {
                dispatch({
                    type: ActionTypes.LOGIN_SUCCESS,
                    payload: {user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken},
                });
                localStorage.setItem('refreshToken', data.refreshToken);
                localStorage.setItem('accessToken', data.accessToken);
            } else if (data.status === 401 || data.status === 403) {
                dispatch({type: ActionTypes.LOGIN_FAILURE, payload: 'Неверный логин или пароль'});
            } else {
                dispatch({type: ActionTypes.LOGIN_FAILURE, payload: data.message});
            }
        } catch (error) {
            dispatch({type: ActionTypes.LOGIN_FAILURE, payload: (error as Error).message});
        }
    };
};

export const logoutUser = (): AppThunk => {
    return async (dispatch) => {
        const refreshToken = localStorage.getItem('refreshToken');
        dispatch({type: ActionTypes.LOGOUT_REQUEST});
        try {
            const data = await request('/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: refreshToken}),
            });

            if (data.success) {
                dispatch({type: ActionTypes.LOGOUT_SUCCESS});
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
            } else {
                dispatch({type: ActionTypes.LOGOUT_FAILURE, payload: data.message});
            }
        } catch (error) {
            dispatch({type: ActionTypes.LOGOUT_FAILURE, payload: (error as Error).message});
        }
    };
};


export const refreshToken = (): AppThunk => {
    return async (dispatch) => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return Promise.reject(' ');
        dispatch({type: ActionTypes.TOKEN_REFRESH_REQUEST});
        try {
            const data = await request('/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token: refreshToken}),
            });

            if (data.success) {
                dispatch({
                    type: ActionTypes.TOKEN_REFRESH_SUCCESS,
                    payload: {accessToken: data.accessToken, refreshToken: data.refreshToken},
                });

                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);

                return true;
            } else {
                dispatch({type: ActionTypes.TOKEN_REFRESH_FAILURE, payload: data.message});
                return false;
            }
        } catch (error) {
            dispatch({type: ActionTypes.TOKEN_REFRESH_FAILURE, payload: (error as Error).message});
            return false;
        }
    };
};


export const setEmailRegister = (email: string): TAuthActionTypes => ({
    type: ActionTypes.SET_EMAIL_REGISTER,
    payload: email,
});

export const setPasswordRegister = (password: string): TAuthActionTypes => ({
    type: ActionTypes.SET_PASSWORD_REGISTER,
    payload: password,
});

export const setNameRegister = (name: string): TAuthActionTypes => ({
    type: ActionTypes.SET_NAME_REGISTER,
    payload: name,
});

export const setEmailLogin = (email: string): TAuthActionTypes => ({
    type: ActionTypes.SET_EMAIL_LOGIN,
    payload: email,
});

export const setPasswordLogin = (password: string): TAuthActionTypes => ({
    type: ActionTypes.SET_PASSWORD_LOGIN,
    payload: password,
});

export const markForgotPasswordVisited = (): TAuthActionTypes => ({
    type: ActionTypes.FORGOT_PASSWORD_VISITED,
});


