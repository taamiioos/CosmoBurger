import { ActionTypes } from '../types/profile-types';
import profileReducer, { initialState } from './profile-reducer';

describe('Проверка редьюсера profileReducer', () => {
    const userPayload = {
        email: 'tata@example.com',
        name: 'Tata',
    };
    it('Проверка начального состояния', () => {
        expect(profileReducer(undefined, {} as any)).toEqual(initialState);
    });
    it('Проверка действия GET_USER_REQUEST', () => {
        const action = {
            type: ActionTypes.GET_USER_REQUEST,
        };
        const expectedState = {
            ...initialState,
            successGet: false,
        };
        const result = profileReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка действия GET_USER_SUCCESS', () => {
        const action = {
            type: ActionTypes.GET_USER_SUCCESS,
            payload: userPayload,
        };
        const expectedState = {
            ...initialState,
            successGet: true,
            email: userPayload.email,
            name: userPayload.name,
        };
        const result = profileReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка действия GET_USER_FAILURE', () => {
        const action = {
            type: ActionTypes.GET_USER_FAILURE,
            payload: 'Error',
        };
        const expectedState = {
            ...initialState,
            successGet: false,
        }
        const result = profileReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка действия UPDATE_USER_REQUEST', () => {
        const action = {
            type: ActionTypes.UPDATE_USER_REQUEST,
        };
        const expectedState = {
            ...initialState,
            successPatch: false,
        };

        const result = profileReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка действия UPDATE_USER_SUCCESS', () => {
        const action = {
            type: ActionTypes.UPDATE_USER_SUCCESS,
            payload: userPayload,
        };
        const expectedState = {
            ...initialState,
            successPatch: true,
            email: userPayload.email,
            name: userPayload.name,
        };

        const result = profileReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка действия UPDATE_USER_FAILURE', () => {
        const action = {
            type: ActionTypes.UPDATE_USER_FAILURE,
        };
        const expectedState = {
            ...initialState,
            successPatch: false,
        };
        const result = profileReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
});
