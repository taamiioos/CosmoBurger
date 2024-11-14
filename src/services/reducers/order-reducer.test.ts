import { ActionTypes } from '../types/order-types';
import orderReducer, { initialState } from './order-reducer';

describe('Проверка редьюсера orderReducer', () => {
    const errorPayload = 'Some error message';
    const orderNumberPayload = 12345;
    it('Проверка начального состояния', () => {
        expect(orderReducer(undefined, {} as any)).toEqual(initialState);
    });
    it('Проверка ORDER_REQUEST', () => {
        const action = {
            type: ActionTypes.ORDER_REQUEST,
        };
        const expectedState = {
            ...initialState,
            orderRequest: true,
            orderFailed: false,
            error: '',
        };
        const result = orderReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка ORDER_SUCCESS', () => {
        const action = {
            type: ActionTypes.ORDER_SUCCESS,
            payload: orderNumberPayload,
        };
        const expectedState = {
            ...initialState,
            orderNumber: orderNumberPayload,
            orderRequest: false,
            orderFailed: false,
        };
        const result = orderReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка ORDER_ERROR', () => {
        const action = {
            type: ActionTypes.ORDER_ERROR,
            payload: errorPayload,
        };
        const expectedState = {
            ...initialState,
            orderRequest: false,
            orderFailed: true,
            error: errorPayload,
        };
        const result = orderReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    
});
