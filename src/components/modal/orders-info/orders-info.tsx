import React, {useEffect, useState, useMemo} from 'react';
import {useParams} from 'react-router-dom';
import styles from './orders-info.module.css';
import {useSelector} from 'react-redux';
import {RootState} from '../../../services/reducers/root-reducer';
import {fetchOrderDetails} from '../../../api/request-response';
import {ClipLoader} from 'react-spinners';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch} from '../../../services/store';
import {calculateOrderTotal, countIngredients, formatOrderDate, renderOrderStatus} from '../../helpers/helpers';

const OrdersInfo: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {orders, currentOrder} = useSelector((state: RootState) => state.ws);
    const ingredientsPrices = useSelector((state: RootState) => state.ingredients.ingredients);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(true);

    const getIngredientDetails = (ingredientId: string) =>
        ingredientsPrices.find(item => item._id === ingredientId);
    const order = orders.find((item) => item.number.toString() === id) || currentOrder;
    useEffect(() => {
        if (!order && id) {
            dispatch(fetchOrderDetails(id));
        }
    }, [id, order, dispatch]);

    useEffect(() => {
        if (order) setLoading(false);
    }, [order]);

    const ingredientCount = useMemo(() => countIngredients(order?.ingredients || []), [order?.ingredients]);
    const totalPrice = useMemo(() => calculateOrderTotal(order?.ingredients || [], ingredientsPrices), [order?.ingredients, ingredientsPrices]);

    if (loading) {
        return (
            <div className={styles.loaderWrapper}>
                <ClipLoader size={70} color={'rgba(76, 76, 255, 1)'}/>
            </div>
        );
    }
    if (!order) {
        return <p>Заказ не найден.</p>;
    }
    return (
        <div className={styles.orderDetails}>
            <span className={`${styles.orderNumber} text text_type_digits-default`}>#{order.number}</span>
            <span className={`${styles.orderName} text text_type_main-medium`}>{order.name}</span>
            <span className={`${styles.orderStatus} text text_type_main-default`}>
                {renderOrderStatus(order.status)}
            </span>
            <h3 className={styles.consist}>Состав:</h3>
            <ul className={styles.scroll}>
                {Object.entries(ingredientCount).map(([ingredientId, count]) => {
                    const ingredient = getIngredientDetails(ingredientId);
                    if (ingredient) {
                        return (
                            <li key={ingredientId} className={styles.ingredient}>
                                <img src={ingredient.image} alt={ingredient.name} className={styles.ingredientImage}/>
                                <span className={styles.ingredientName}>{ingredient.name}</span>
                                <span className={`${styles.ingredientPrice} text text_type_digits-default`}>
                                    {count} × {ingredient.price} <CurrencyIcon className={styles.icon} type="primary"/>
                                </span>
                            </li>
                        );
                    }
                })}
            </ul>
            <div className={styles.line}>
                <span className={`${styles.orderDate} text text_type_main-default text_color_inactive`}>
                    {formatOrderDate(order.createdAt)}
                </span>
                <p className={`${styles.orderPrice} text text_type_digits-default`}>
                    {totalPrice} <CurrencyIcon className={styles.icon} type="primary"/>
                </p>
            </div>
        </div>
    );
};

export default OrdersInfo;
