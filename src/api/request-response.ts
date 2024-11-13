import {BASE_URL} from '../api/api-config';
import {refreshToken} from '../services/actions/auth-actions';
import {setCurrentOrder} from '../services/actions/ws-actions';

export async function checkResponse(res: Response): Promise<any> {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export async function request(endpoint: string, options?: RequestInit): Promise<any> {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    return checkResponse(response);
}

export const fetchOrderDetails = (id: string) => {
    return (dispatch) => {
        return request(`/orders/${id}`, {
            method: 'GET',
        })
            .then((data) => {
                if (data.success && data.orders && data.orders.length > 0) {
                    const order = data.orders[0];
                    dispatch(setCurrentOrder(order));
                } else {
                    throw new Error('Заказ не найден');
                }
            })
            .catch((error) => {
                if ((error as Error).message === 'jwt expired') {
                    return dispatch(refreshToken())
                        .then(() => {
                            return dispatch(fetchOrderDetails(id));
                        })
                } else {
                    console.error('Неизвестная ошибка при получении заказа:', error);
                }
            });
    };
};
