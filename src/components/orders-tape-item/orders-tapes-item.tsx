import React, {useMemo} from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './orders-tape-item.module.css';
import {IOrderItemProps} from '../types/components-types';
import {calculateOrderTotal, formatOrderDate, renderOrderStatus} from '../helpers/helpers';

const OrderItem: React.FC<IOrderItemProps> = ({order, ingredientsPrices, onClick}) => {
    const maxVisibleIngredients = 6;
    const ingredientImages = useMemo(() => {
        return order.ingredients
            .map(id => ingredientsPrices.find(ing => ing._id === id)?.image)
            .filter(Boolean) as string[];
    }, [order.ingredients, ingredientsPrices]);

    const orderTotal = useMemo(() => calculateOrderTotal(order.ingredients, ingredientsPrices), [order.ingredients, ingredientsPrices]);
    return (
        <div className={styles.orderItem} onClick={() => onClick(order)}>
            <div className={styles.line}>
                <span className={`${styles.orderNumber} text text_type_digits-default`}>#{order.number}</span>
                <span className={`${styles.orderDate} text text_type_main-default text_color_inactive`}>
                    {formatOrderDate(order.createdAt)}
                </span>
            </div>
            <span className={`${styles.orderName} text text_type_main-medium`}>{order.name}</span>
            <span className={`${styles.orderStatus} text text_type_main-default`}>
                {renderOrderStatus(order.status)}
            </span>
            <div className={styles.line}>
                <div className={styles.ingredients}>
                    {ingredientImages.slice(0, maxVisibleIngredients).map((image, index) => (
                        <div className={styles.ingredientContainer} key={index}>
                            <img src={image} alt="ingredient" className={styles.ingredientImage}/>
                        </div>
                    ))}
                </div>
                <p className={`${styles.orderPrice} text text_type_digits-default`}>
                    {orderTotal} <CurrencyIcon className={styles.icon} type="primary"/>
                </p>
            </div>
        </div>
    );
};

export default OrderItem;
