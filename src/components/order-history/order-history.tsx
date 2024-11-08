import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './order-history.module.css';
import {IOrder} from '../types/components-types';
import {connect, disconnect, setCurrentOrder, setWsUrlUser} from '../../services/actions/ws-actions';
import {AppDispatch} from '../../services/store';
import {RootState} from '../../services/reducers/root-reducer';
import OrderItem from '../orders-tape-item/orders-tapes-item';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useModal} from '../../hooks/use-modal';
import {fetchOrderDetails} from '../../api/request-response';

const OrderHistory: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const {openModal} = useModal();
    const location = useLocation();
    const {orders} = useSelector((state: RootState) => state.ws);
    const ingredientsPrices = useSelector((state: RootState) => state.ingredients.ingredients);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            console.error("Токен отсутствует");
            return;
        }
        const cleanToken = token.replace('Bearer ', '');
        const wsUrl = `wss://norma.nomoreparties.space/orders?token=${cleanToken}`;
        dispatch(setWsUrlUser(wsUrl));
        dispatch(connect());
        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);
    useEffect(() => {
        if (id) {
            const order = orders.find(order => order.number.toString() === id);
            if (!order) {
                dispatch(fetchOrderDetails(id));
            }
        }
    }, [id, orders, dispatch]);

    const openOrderDetails = (order: IOrder) => {
        dispatch(setCurrentOrder(order));
        openModal();
        navigate(`/profile/orders/${order.number}`, {state: {background: location}});

    };
    return (
        <div className={styles.orderList}>
            <div className={styles.scroll}>
                {orders
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((order) => (
                        <OrderItem
                            key={order._id}
                            order={order}
                            ingredientsPrices={ingredientsPrices}
                            onClick={openOrderDetails}
                        />
                    ))}
            </div>
        </div>
    );
}

export default OrderHistory;
