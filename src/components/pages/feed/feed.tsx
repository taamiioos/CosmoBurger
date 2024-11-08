import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './feed.module.css';
import {connect, disconnect, setWsUrl} from '../../../services/actions/ws-actions';
import {RootState} from '../../../services/reducers/root-reducer';
import {useAppDispatch} from '../../../services/store';
import {IOrder} from '../../types/components-types';
import OrderItem from '../../orders-tape-item/orders-tapes-item';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useModal} from '../../../hooks/use-modal';
import {fetchOrderDetails} from '../../../api/request-response';

const Feed: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {openModal} = useModal();
    const location = useLocation();
    const {id} = useParams<{ id: string }>();
    const {orders, total, totalToday} = useSelector((state: RootState) => state.ws);
    const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
    const [readyOrders, setReadyOrders] = useState<string[]>([]);
    const [inProgressOrders, setInProgressOrders] = useState<string[]>([]);

    useEffect(() => {
        const wsUrl = `wss://norma.nomoreparties.space/orders/all`;
        dispatch(setWsUrl(wsUrl));
        dispatch(connect());

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);

    useEffect(() => {
        const ready = orders.filter(order => order.status === 'done').map(order => order.number.toString());
        const inProgress = Array.from(new Set(orders.filter(order => order.status === 'pending').map(order => order.number.toString())));
        setReadyOrders(ready);
        setInProgressOrders(inProgress);
    }, [orders]);

    useEffect(() => {
        if (id) {
            const order = orders.find(order => order.number.toString() === id);
            if (!order) {
                dispatch(fetchOrderDetails(id));
            }
            openModal();

        }
    }, [id, orders, dispatch]);

    const openOrderDetails = (order: IOrder) => {
        openModal();
        navigate(`/feed/${order.number}`, {state: {background: location}});
    };
    return (
        <div className={styles.mainContainer}>
            <section className={styles.first}>
                <h3 className={`${styles.header} text text_type_main-large`}>Лента заказов</h3>
                <div className={styles.scroll}>
                    {orders.map((order) => (
                        <OrderItem
                            key={order._id}
                            order={order}
                            ingredientsPrices={ingredients}
                            onClick={openOrderDetails}
                        />
                    ))}
                </div>
            </section>

            <section className={styles.stats}>
                <div className={styles.statusColumns}>
                    <div className={styles.column}>
                        <h2 className="text text_type_main-medium">Готовы:</h2>
                        <div className={styles.readyColumns}>
                            <div className={styles.readyOrders}>
                                {readyOrders.slice(0, 10).map((number) => (
                                    <p key={number} className={`${styles.orderNumber} text text_type_digits-default`}>
                                        {number}
                                    </p>
                                ))}
                            </div>
                            <div className={styles.readyOrders}>
                                {readyOrders.slice(10, 20).map((number) => (
                                    <p key={number} className={`${styles.orderNumber} text text_type_digits-default`}>
                                        {number}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.column}>
                        <h2 className="text text_type_main-medium">В работе:</h2>
                        <div className={styles.inProgressOrders}>
                            {inProgressOrders.slice(0, 10).map((number) => (
                                <p key={number} className={`${styles.orderNumber} text text_type_digits-default`}>
                                    {number}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.completedStats}>
                    <p className="text text_type_main-medium">Выполнено за все время:</p>
                    <p className={`${styles.totalCount} text text_type_digits-large`}>{total}</p>
                </div>
                <div className={styles.completedStats}>

                    <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                    <p className={`${styles.todayCount} text text_type_digits-large`}>{totalToday}</p>
                </div>
            </section>
        </div>

    );
};

export default Feed;
