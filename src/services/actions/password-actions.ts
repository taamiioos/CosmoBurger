import {
    ActionTypes,
} from './../types/password-types';
import {request} from '../../api/request-response';
import {TPasswordActionTypes} from './../types/password-types';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../../services/reducers/root-reducer';

type ThunkPasswordAction = ThunkAction<void, RootState, unknown, TPasswordActionTypes>;
export const forgotPasswordRequest = (email: string): ThunkPasswordAction => {
    return async (dispatch) => {
        dispatch({type: ActionTypes.FORGOT_PASSWORD_REQUEST});
        try {
            const data = await request('/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });
            if (data.success) {
                dispatch({type: ActionTypes.FORGOT_PASSWORD_SUCCESS, payload: {message: data.message}});
            } else {
                dispatch({type: ActionTypes.FORGOT_PASSWORD_ERROR, payload: data.message});
            }
        } catch (error) {
            dispatch({type: ActionTypes.FORGOT_PASSWORD_ERROR, payload: (error as Error).message});
        }
    };
};

export const resetPasswordRequest = (password: string, token: string): ThunkPasswordAction => {
    return async (dispatch) => {
        dispatch({type: ActionTypes.RESET_PASSWORD_REQUEST});
        try {
            const data = await request('/password-reset/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({password, token}),
            });
            if (data.success) {
                dispatch({type: ActionTypes.RESET_PASSWORD_SUCCESS, payload: {message: data.message}});
            } else {
                dispatch({type: ActionTypes.RESET_PASSWORD_ERROR, payload: data.message});
            }
        } catch (error) {
            dispatch({type: ActionTypes.RESET_PASSWORD_ERROR, payload: (error as Error).message});
        }
    };
};

export const setEmailForgot = (email: string): TPasswordActionTypes => ({
    type: ActionTypes.SET_EMAIL_FORGOT,
    payload: email,
});

export const setPasswordReset = (password: string): TPasswordActionTypes => ({
    type: ActionTypes.SET_PASSWORD_RESET,
    payload: password,
});

export const setCodeReset = (code: string): TPasswordActionTypes => ({
    type: ActionTypes.SET_CODE_RESET,
    payload: code,
});
