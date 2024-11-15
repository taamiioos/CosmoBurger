import React from 'react';
import styles from './order-details.module.css';
import img from '../../../images/img.png';
import {useSelector} from '../../../services/store';

const OrderDetails: React.FC = () => {
    const orderNumber = useSelector(state => state.order.orderNumber);

    return (
        <div className={styles.modalContent} data-testid="order-details">
            <span
                className={`${styles.numOrderStyle} text text_type_digits-large`}
                data-testid="order-number"
            >
                {orderNumber}
            </span>
            <span
                className={`${styles.idOrder} text text_type_main-medium`}
                data-testid="order-id-label"
            >
                идентификатор заказа
            </span>
            <img
                src={img}
                className={styles.orderImageStyle}
                alt='Заказ принят'
                data-testid="order-image"
            />
            <span
                className={`${styles.textStyle1} text text_type_main-default`}
                data-testid="order-status-text"
            >
                Ваш заказ начали готовить
            </span>
            <span
                className={`${styles.textStyle2} text text_type_main-default text_color_inactive`}
                data-testid="order-waiting-text"
            >
                Дождитесь готовности на орбитальной станции
            </span>
        </div>
    );
};

export default OrderDetails;

