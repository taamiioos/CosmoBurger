import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR} from './../actions/action-types';

const initialState = {
    orderNumber: null, orderRequest: false, orderFailed: false, error: ''
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_REQUEST:
            return {
                ...state, orderRequest: true, orderFailed: false, error: ''
            };
        case ORDER_SUCCESS:
            return {
                ...state, orderNumber: action.payload, orderRequest: false, orderFailed: false
            };
        case ORDER_ERROR:
            return {
                ...state, orderRequest: false, orderFailed: true, error: action.payload
            };
        default:
            return state;
    }
};

export default orderReducer;
