import {ActionTypes} from './../types/order-types';
import {request} from '../../api/request-response';
import {AppThunk} from '../store';

export const makeOrder = (ingredients: string[]): AppThunk => {
    return async (dispatch) => {
        dispatch({type: ActionTypes.ORDER_REQUEST});
        try {
            const token = localStorage.getItem('accessToken') || "";
            const data = await request('/orders', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,

                },
                body: JSON.stringify({ingredients}),
            });
            if (data.success && data.order) {
                dispatch({
                    type: ActionTypes.ORDER_SUCCESS,
                    payload: data.order.number,
                });
                dispatch({type: ActionTypes.RESET_INGREDIENT_COUNT});
            } else {
                dispatch({
                    type: ActionTypes.ORDER_ERROR,
                    payload: 'Ошибка при получении номера заказа',
                });
            }
        } catch (error) {
            dispatch({
                type: ActionTypes.ORDER_ERROR,
                payload: (error as Error).message,
            });
            throw error;
        }
    };
};
