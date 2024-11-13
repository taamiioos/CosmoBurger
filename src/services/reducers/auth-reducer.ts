import {TAuthActionTypes, ActionTypes} from './../types/auth-types';

export interface IAuthState {
    isAuth: boolean;
    user: any;
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
    successRegister: boolean;
    successLogin: boolean;
    successLogout: boolean;
    successToken: boolean;
    emailLogin: string;
    passwordLogin: string;
    emailRegister: string;
    passwordRegister: string;
    nameRegister: string;
    hasVisitedForgotPassword: boolean;
}

const initialState: IAuthState = {
    isAuth: !!localStorage.getItem('accessToken'),
    user: null,
    accessToken: localStorage.getItem('accessToken') ?? null,
    refreshToken: localStorage.getItem('refreshToken') ?? null,
    error: null,
    successRegister: false,
    successLogin: false,
    successLogout: false,
    successToken: false,
    emailLogin: "",
    passwordLogin: "",
    emailRegister: "",
    passwordRegister: "",
    nameRegister: "",
    hasVisitedForgotPassword: false,
};

const authReducer = (state = initialState, action: TAuthActionTypes): IAuthState => {
    switch (action.type) {
        case ActionTypes.REGISTER_REQUEST:
            return {...state, error: null};
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state, isAuth: true, user: action.payload?.user, accessToken: action.payload?.accessToken || null,
                refreshToken: action.payload?.refreshToken || null
            };
        case ActionTypes.REGISTER_FAILURE:
            return {...state, error: action.payload || null};
        case ActionTypes.LOGIN_REQUEST:
            return {...state, error: null};
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state, isAuth: true, user: action.payload?.user, accessToken: action.payload?.accessToken || null,
                refreshToken: action.payload?.refreshToken || null
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state, error: action.payload || null};
        case ActionTypes.LOGOUT_REQUEST:
            return {...state, error: null};
        case ActionTypes.LOGOUT_SUCCESS:
            return {...initialState};
        case ActionTypes.TOKEN_REFRESH_FAILURE:
            return {...state, error: action.payload || " "};

        case ActionTypes.TOKEN_REFRESH_REQUEST:
            return {...state, error: null};
        case ActionTypes.TOKEN_REFRESH_SUCCESS:
            return {
                ...state, accessToken: action.payload?.accessToken || null,
                refreshToken: action.payload?.refreshToken || null
            };
        case ActionTypes.TOKEN_REFRESH_FAILURE:
            return {...state, error: action.payload || null};
        case ActionTypes.SET_EMAIL_REGISTER:
            return {...state, emailRegister: action.payload || " "};
        case ActionTypes.SET_PASSWORD_REGISTER:
            return {...state, passwordRegister: action.payload || ""};
        case ActionTypes.SET_NAME_REGISTER:
            return {...state, nameRegister: action.payload || " "};
        case ActionTypes.SET_EMAIL_LOGIN:
            return {...state, emailLogin: action.payload || ""};
        case ActionTypes.SET_PASSWORD_LOGIN:
            return {...state, passwordLogin: action.payload || ""};
        case ActionTypes.FORGOT_PASSWORD_VISITED:
            return {...state, hasVisitedForgotPassword: true};
        default:
            return state;
    }
};

export default authReducer;