import React from 'react';
import styles from './order-details.module.css';
import img from '../../../images/img.png'
import PropTypes from "prop-types";


const OrderDetails = ({numOrder}) => {
    return (
            <div className={styles.modalContent}>
                <span className={`${styles.numOrderStyle} text text_type_digits-large`}>{numOrder}</span>
                <span className={`${styles.idOrder}text text_type_main-medium`}>идентификатор заказа</span>
                <img src={img} className={styles.orderImageStyle} alt='Заказ принят'></img>
                <span className={`${styles.textStyle1} text text_type_main-default`}>Ваш заказ начали готовить</span>
                <span className={`${styles.textStyle2} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</span>
            </div>
    );
};
OrderDetails.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    numOrder: PropTypes.string.isRequired,
};
export default OrderDetails;
