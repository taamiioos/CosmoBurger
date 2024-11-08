import {IOrder} from '../../components/types/components-types';
import {ActionTypes} from '../types/ws-types';

export interface IOrdersState {
    orders: IOrder[];
    isConnected: boolean;
    total: number;
    totalToday: number;
    wsUrl: string;
    loading: boolean;
    currentOrder: IOrder | null;
}

const initialState: IOrdersState = {
    orders: [],
    isConnected: false,
    total: 0,
    totalToday: 0,
    wsUrl: '',
    loading: false,
    currentOrder: null
};

const wsReducer = (state = initialState, action: any): IOrdersState => {
    switch (action.type) {
        case ActionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
                loading: false,
            };
        case ActionTypes.UPDATE_ORDERS:
            return {
                ...state,
                orders: [...state.orders, ...action.payload], 
            };
        case ActionTypes.WS_CONNECT:
            return {...state, isConnected: true, loading: true};
        case ActionTypes.WS_DISCONNECT:
            return {...state, isConnected: false, loading: false};
        case ActionTypes.SET_WS_URL:
        case ActionTypes.SET_WS_URL_USER:
            return {...state, wsUrl: action.payload};
        case ActionTypes.SET_CURRENT_ORDER:
            return {...state, currentOrder: action.payload};
        default:
            return state;
    }
};

export default wsReducer;
