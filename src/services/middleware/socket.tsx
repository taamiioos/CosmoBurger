import {Middleware, MiddlewareAPI} from 'redux';
import {RootState} from '../../services/reducers/root-reducer';
import {AppDispatch} from '../store';
import {setOrders} from '../actions/ws-actions';
import {ActionTypes} from '../types/ws-types';

let socket: WebSocket | null = null;
let isReconnect = false;

export const wsMiddleware: Middleware<unknown, RootState, AppDispatch> =
    (store: MiddlewareAPI<AppDispatch, RootState>) => (next) => (action) => {
        const {dispatch, getState} = store;

        const connectSocket = () => {
            const wsUrl = getState().ws.wsUrl;
            if (!socket || socket.readyState === WebSocket.CLOSED) {
                if (!getState().ws.isConnected) {
                    console.log('Подключение к WebSocket...');
                    socket = new WebSocket(wsUrl);
                    socket.onopen = () => handleSocketOpen();
                    socket.onerror = (event) => handleSocketError(event);
                    socket.onmessage = (event) => handleSocketMessage(event);
                    socket.onclose = (event) => handleSocketClose(event);
                }
            }
        };
        const handleSocketOpen = () => {
            console.log('Подключение к WebSocket успешно установлено.');
            isReconnect = false;
        };

        const handleSocketError = (event: Event) => {
            console.error('Ошибка WebSocket:', event);
        };

        const handleSocketMessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                if (data.success) {
                    dispatch(setOrders({
                        orders: data.orders,
                        total: data.total,
                        totalToday: data.totalToday,
                    }));
                }
            } catch (error) {
                console.error('Ошибка при разборе данных WebSocket:', error);
            }
        };


        const handleSocketClose = (event: CloseEvent) => {
            console.log('WebSocket закрыт.', event);
            socket = null;
            if (!isReconnect) {
                console.log('Попытка переподключения через 5 секунд...');
                isReconnect = true;
                setTimeout(() => dispatch({type: ActionTypes.WS_CONNECT}), 5000);
            }
        };

        const disconnectSocket = () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                console.log('Закрытие соединения с WebSocket...');
                socket.close(1000, '');
                socket = null;
            }
        };

        if (typeof action === 'object' && action !== null && 'type' in action) {
            switch (action.type) {
                case ActionTypes.WS_CONNECT:
                    console.log('Запрос на подключение к WebSocket...');
                    connectSocket();
                    break;

                case ActionTypes.WS_DISCONNECT:
                    console.log('Запрос на отключение от WebSocket...');
                    disconnectSocket();
                    break;

                default:
                    break;
            }
        }

        return next(action);
    };
