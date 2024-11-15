import {TOrderActionTypes, ActionTypes} from './../types/order-types';

export interface IOrderState {
    orderNumber: number | null;
    orderRequest: boolean;
    orderFailed: boolean;
    error: any;
}

export const initialState: IOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
    error: ''
};

const orderReducer = (state = initialState, action: TOrderActionTypes): IOrderState => {
    switch (action.type) {
        case ActionTypes.ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                error: ''
            };
        case ActionTypes.ORDER_SUCCESS:
            return {
                ...state,
                orderNumber: typeof action.payload === 'number' ? action.payload : null,
                orderRequest: false,
                orderFailed: false
            };
        case ActionTypes.ORDER_ERROR:
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
                error: action.payload
            };
        default:
            return state;
    }
};

export default orderReducer;