import {ORDER_REQUEST, ORDER_SUCCESS, ORDER_ERROR} from './action-types';
const URL_ORDER = `https://norma.nomoreparties.space/api/orders`;

export const makeOrder = (ingredients) => {
    return (dispatch) => {
        dispatch({type: ORDER_REQUEST});
        fetch(`${URL_ORDER}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ingredients})
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then(data => {
                dispatch({
                    type: ORDER_SUCCESS, payload: data.order.number
                });
            })
            .catch(error => {
                dispatch({
                    type: ORDER_ERROR, payload: error.message
                });
                console.error(`Ошибка: ${error.message}`);
            });
    };
};
