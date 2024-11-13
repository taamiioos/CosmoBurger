import {IOrder} from '../../components/types/components-types';
import {ActionTypes, WebSocketActions} from '../types/ws-types';

export const setOrders = (data: { orders: IOrder[]; total: number; totalToday: number }): WebSocketActions => ({
    type: ActionTypes.SET_ORDERS,
    payload: data,
});

export const updateOrders = (orders: IOrder[]): WebSocketActions => ({
    type: ActionTypes.UPDATE_ORDERS,
    payload: orders,
});

export const connect = (): WebSocketActions => ({
    type: ActionTypes.WS_CONNECT,
});

export const disconnect = (): WebSocketActions => ({
    type: ActionTypes.WS_DISCONNECT,
});

export const sendOrder = (order: IOrder): WebSocketActions => ({
    type: ActionTypes.SEND_ORDER,
    payload: order,
});

export const setWsUrl = (url: string): WebSocketActions => ({
    type: ActionTypes.SET_WS_URL,
    payload: url,
});

export const setWsUrlUser = (url: string): WebSocketActions => ({
    type: ActionTypes.SET_WS_URL_USER,
    payload: url,
});

export const setCurrentOrder = (order: IOrder): WebSocketActions => ({
    type: ActionTypes.SET_CURRENT_ORDER,
    payload: order,
});
