import {ActionTypes} from '../types/password-types';
import passwordReducer, {initialState} from './password-reducer';

describe('Проверка редьюсера passwordReducer', () => {
    const errorPayload = 'Some error message';
    const emailPayload = 'tata@example.com';
    const passwordPayload = '1123';
    const codePayload = '123456';
    it('Проверка начального состояния', () => {
        expect(passwordReducer(undefined, {} as any)).toEqual(initialState);
    });
    it('Проверка FORGOT_PASSWORD_REQUEST', () => {
        const action = {
            type: ActionTypes.FORGOT_PASSWORD_REQUEST,
        };
        const expectedState = {
            ...initialState,
            error: null,
            successForgot: false,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка FORGOT_PASSWORD_SUCCESS', () => {
        const action = {
            type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
        };
        const expectedState = {
            ...initialState,
            successForgot: true,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка FORGOT_PASSWORD_ERROR', () => {
        const action = {
            type: ActionTypes.FORGOT_PASSWORD_ERROR,
            payload: errorPayload,
        };
        const expectedState = {
            ...initialState,
            error: errorPayload,
            successForgot: false,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка SET_EMAIL_FORGOT', () => {
        const action = {
            type: ActionTypes.SET_EMAIL_FORGOT,
            payload: emailPayload,
        };
        const expectedState = {
            ...initialState,
            email: emailPayload,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка RESET_PASSWORD_REQUEST', () => {
        const action = {
            type: ActionTypes.RESET_PASSWORD_REQUEST,
        };
        const expectedState = {
            ...initialState,
            error: null,
            successReset: false,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка RESET_PASSWORD_SUCCESS', () => {
        const action = {
            type: ActionTypes.RESET_PASSWORD_SUCCESS,
        };
        const expectedState = {
            ...initialState,
            successReset: true,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка RESET_PASSWORD_ERROR', () => {
        const action = {
            type: ActionTypes.RESET_PASSWORD_ERROR,
            payload: errorPayload,
        };
        const expectedState = {
            ...initialState,
            error: errorPayload,
            successReset: false,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка SET_PASSWORD_RESET', () => {
        const action = {
            type: ActionTypes.SET_PASSWORD_RESET,
            payload: passwordPayload,
        };
        const expectedState = {
            ...initialState,
            password: passwordPayload,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка SET_CODE_RESET', () => {
        const action = {
            type: ActionTypes.SET_CODE_RESET,
            payload: codePayload,
        };
        const expectedState = {
            ...initialState,
            code: codePayload,
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка SET_EMAIL_FORGOT с пустым значением', () => {
        const action = {
            type: ActionTypes.SET_EMAIL_FORGOT,
            payload: "",
        };
        const expectedState = {
            ...initialState,
            email: "",
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка SET_PASSWORD_RESET с пустым значением', () => {
        const action = {
            type: ActionTypes.SET_PASSWORD_RESET,
            payload: "",
        };
        const expectedState = {
            ...initialState,
            password: "",
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка SET_CODE_RESET с пустым значением', () => {
        const action = {
            type: ActionTypes.SET_CODE_RESET,
            payload: "",
        };
        const expectedState = {
            ...initialState,
            code: "",
        };
        const result = passwordReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });


});
