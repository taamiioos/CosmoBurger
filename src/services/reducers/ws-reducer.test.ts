import {IOrder} from "../../components/types/components-types";
import {ActionTypes} from "../types/ws-types";
import wsReducer, {initialState} from "./ws-reducer";

describe('Проверка редьюсера wsReducer', () => {
    const orders: IOrder[] = [
        {
            _id: '1',
            number: 101,
            name: 'Бургер1',
            status: 'done',
            createdAt: '2024-11-14T00:00:00.000Z',
            ingredients: ['ingredient1', 'ingredient2'],
        },
        {
            _id: '2',
            number: 102,
            name: 'Бургер2',
            status: 'pending',
            createdAt: '2024-11-14T00:10:00.000Z',
            ingredients: ['ingredient3', 'ingredient4'],
        },
    ];

    const order: IOrder = {
        _id: '1',
        number: 101,
        name: 'Бургер3',
        status: 'done',
        createdAt: '2024-11-14T00:00:00.000Z',
        ingredients: ['ingredient1', 'ingredient2'],
    };

    it('Проверка начального состояния', () => {
        expect(wsReducer(undefined, {} as any)).toEqual(initialState);
    });
    it('Проверка SET_ORDERS', () => {
        const action = {
            type: ActionTypes.SET_ORDERS,
            payload: {orders, total: 2, totalToday: 1}
        }
        const expectedState = {
            ...initialState,
            orders,
            total: 2,
            totalToday: 1,
            loading: false,
        };
        const result = wsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка UPDATE_ORDERS', () => {
        const updatedOrders: IOrder[] = [
            {
                _id: '3',
                number: 103,
                name: 'Бургер2',
                status: 'done',
                createdAt: '2024-11-14T01:00:00.000Z',
                ingredients: ['ingredient5', 'ingredient6'],
            },
        ];
        const action = {
            type: ActionTypes.UPDATE_ORDERS,
            payload: updatedOrders,
        };
        const expectedState = {
            ...initialState,
            orders: updatedOrders,
        };
        const result = wsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка WS_CONNECT', () => {
        const action = {type: ActionTypes.WS_CONNECT};
        const expectedState = {
            ...initialState,
            isConnected: true,
            loading: true,
        };
        const result = wsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка WS_DISCONNECT', () => {
        const action = {type: ActionTypes.WS_DISCONNECT};
        const expectedState = {
            ...initialState,
            isConnected: false,
            loading: false,
        };
        const result = wsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка SET_WS_URL', () => {
        const action = {
            type: ActionTypes.SET_WS_URL,
            payload: 'ws://localhost:3000',
        };
        const expectedState = {
            ...initialState,
            wsUrl: 'ws://localhost:3000',
        };
        const result = wsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка SET_CURRENT_ORDER', () => {
        const action = {
            type: ActionTypes.SET_CURRENT_ORDER,
            payload: order,
        };
        const expectedState = {
            ...initialState,
            currentOrder: order,
        };
        const result = wsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
})