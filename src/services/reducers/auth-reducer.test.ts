import { ActionTypes } from "../types/auth-types";
import authReducer, { initialState } from "./auth-reducer";

describe('Проверка редьюсера authReducer', () => {

    it('Проверка начального состояния', () => {
        expect(authReducer(undefined, {} as any)).toEqual(initialState);
    });
    it('Проверка REGISTER_REQUEST', () => {
        const action = { type: ActionTypes.REGISTER_REQUEST };
        const expectedState = { ...initialState, error: null };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка REGISTER_SUCCESS', () => {
        const action = {
            type: ActionTypes.REGISTER_SUCCESS,
            payload: {
                user: { name: 'Tata' },
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            },
        };
        const expectedState = {
            ...initialState,
            isAuth: true,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка REGISTER_FAILURE', () => {
        const action = {
            type: ActionTypes.REGISTER_FAILURE,
            payload: 'Ошибка при регистрации',
        };
        const expectedState = {
            ...initialState,
            error: 'Ошибка при регистрации',
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка LOGIN_REQUEST', () => {
        const action = { type: ActionTypes.LOGIN_REQUEST };
        const expectedState = { ...initialState, error: null };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка LOGIN_SUCCESS', () => {
        const action = {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: {
                user: { name: 'Tata' },
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            },
        };
        const expectedState = {
            ...initialState,
            isAuth: true,
            user: action.payload.user,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка LOGIN_FAILURE', () => {
        const action = {
            type: ActionTypes.LOGIN_FAILURE,
            payload: 'Ошибка при входе',
        };
        const expectedState = {
            ...initialState,
            error: 'Ошибка при входе',
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка LOGOUT_REQUEST', () => {
        const action = { type: ActionTypes.LOGOUT_REQUEST };
        const expectedState = { ...initialState, error: null };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка LOGOUT_SUCCESS', () => {
        const action = { type: ActionTypes.LOGOUT_SUCCESS };
        const expectedState = { ...initialState };
        let result = authReducer(initialState, {
            type: ActionTypes.LOGIN_SUCCESS,
            payload: {
                user: { name: 'Tata' },
                accessToken: 'access-token',
                refreshToken: 'refresh-token',
            },
        });
        result = authReducer(result, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка TOKEN_REFRESH_FAILURE', () => {
        const action = {
            type: ActionTypes.TOKEN_REFRESH_FAILURE,
            payload: 'Ошибка при обновлении токена',
        };
        const expectedState = {
            ...initialState,
            error: 'Ошибка при обновлении токена',
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка TOKEN_REFRESH_REQUEST', () => {
        const action = { type: ActionTypes.TOKEN_REFRESH_REQUEST };
        const expectedState = { ...initialState, error: null };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка TOKEN_REFRESH_SUCCESS', () => {
        const action = {
            type: ActionTypes.TOKEN_REFRESH_SUCCESS,
            payload: {
                accessToken: 'new-access-token',
                refreshToken: 'new-refresh-token',
            },
        };
        const expectedState = {
            ...initialState,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка SET_EMAIL_REGISTER', () => {
        const action = {
            type: ActionTypes.SET_EMAIL_REGISTER,
            payload: 'tata@example.com',
        };
        const expectedState = {
            ...initialState,
            emailRegister: 'tata@example.com',
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка SET_PASSWORD_REGISTER', () => {
        const action = {
            type: ActionTypes.SET_PASSWORD_REGISTER,
            payload: '123',
        };
        const expectedState = {
            ...initialState,
            passwordRegister: '123',
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка SET_NAME_REGISTER', () => {
        const action = {
            type: ActionTypes.SET_NAME_REGISTER,
                payload: 'Tata',
        };
        const expectedState = {
            ...initialState,
            nameRegister: 'Tata',
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка SET_EMAIL_LOGIN', () => {
        const action = {
            type: ActionTypes.SET_EMAIL_LOGIN,
            payload: 'tata@example.com',
        };
        const expectedState = {
            ...initialState,
            emailLogin: 'tata@example.com',
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка SET_PASSWORD_LOGIN', () => {
        const action = {
            type: ActionTypes.SET_PASSWORD_LOGIN,
            payload: 'loginpassword',
        };
        const expectedState = {
            ...initialState,
            passwordLogin: 'loginpassword',
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка FORGOT_PASSWORD_VISITED', () => {
        const action = { type: ActionTypes.FORGOT_PASSWORD_VISITED };
        const expectedState = {
            ...initialState,
            hasVisitedForgotPassword: true,
        };
        const result = authReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

});
