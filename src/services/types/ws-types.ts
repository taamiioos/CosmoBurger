import {IOrder} from '../../components/types/components-types';

export const ActionTypes = {
    SET_ORDERS: 'SET_ORDERS',
    WS_CONNECT: 'WS_CONNECT',
    WS_DISCONNECT: 'WS_DISCONNECT',
    UPDATE_ORDERS: 'UPDATE_ORDERS',
    SEND_ORDER: 'SEND_ORDER',
    SET_WS_URL: 'SET_WS_URL',
    SET_WS_URL_USER: 'SET_WS_URL_USER',
    SET_USER_ORDERS: 'SET_USER_ORDERS',
    SET_CURRENT_ORDER: 'SET_CURRENT_ORDER',
} as const;
export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

interface IAction<T extends ActionTypes, P = void> {
    type: T;
    payload?: P;
}

export type WebSocketActions =
    | IAction<typeof ActionTypes.SET_ORDERS, { orders: IOrder[]; total: number; totalToday: number }>
    | IAction<typeof ActionTypes.WS_CONNECT>
    | IAction<typeof ActionTypes.WS_DISCONNECT>
    | IAction<typeof ActionTypes.UPDATE_ORDERS, IOrder[]>
    | IAction<typeof ActionTypes.SEND_ORDER, IOrder>
    | IAction<typeof ActionTypes.SET_WS_URL, string>
    | IAction<typeof ActionTypes.SET_WS_URL_USER, string>
    | IAction<typeof ActionTypes.SET_USER_ORDERS, IOrder>
    | IAction<typeof ActionTypes.SET_CURRENT_ORDER, IOrder>;
