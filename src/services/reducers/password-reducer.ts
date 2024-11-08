import {TPasswordActionTypes, ActionTypes} from "../types/password-types";

export interface IPasswordState {
    email: string;
    password: string;
    code: string;
    error: any;
    successForgot: boolean;
    successReset: boolean;
}

const initialState: IPasswordState = {
    email: '',
    password: '',
    code: '',
    error: null,
    successForgot: false,
    successReset: false
};

export const passwordReducer = (state = initialState, action: TPasswordActionTypes): IPasswordState => {
    switch (action.type) {
        case ActionTypes.FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                error: null,
                successForgot: false
            };
        case ActionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                successForgot: true
            };
        case ActionTypes.FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
                successForgot: false
            };
        case ActionTypes.SET_EMAIL_FORGOT:
            return {
                ...state,
                email: action.payload || ""
            };
        case ActionTypes.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                error: null,
                successReset: false
            };
        case ActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                successReset: true
            };
        case ActionTypes.RESET_PASSWORD_ERROR:
            return {
                ...state,
                error: action.payload,
                successReset: false
            };
        case ActionTypes.SET_PASSWORD_RESET:
            return {
                ...state,
                password: action.payload || ""
            };
        case ActionTypes.SET_CODE_RESET:
            return {
                ...state,
                code: action.payload || ""
            };
        default:
            return state;
    }
};

export default passwordReducer;