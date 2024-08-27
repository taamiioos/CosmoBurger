import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import Modal from '../modal';

const IngredientDetails = ({title, children, onClose, ingredient}) => {
    return (
        <Modal onClose={onClose} title={title}>
            {ingredient && (
                <>
                    <div className={styles.modalContent}>
                        {ingredient && (
                            <div>
                                <div className={styles.imageContainer}>
                                <img className={styles.ingredientImage} src={ingredient.image} alt={ingredient.name}/>
                                </div>
                                <h3 className={`${styles.ingredientName} text text_type_main-medium`}>{ingredient.name}</h3>
                                <ul className={styles.characteristics}>
                                    <li className={styles.item}>
                                        <span
                                            className={`${styles.label} text text_type_main-default text_color_inactive`}>Калории, ккал</span>
                                        <span
                                            className={`${styles.value} text text_type_digits-default text_color_inactive`}>{ingredient.calories}</span>
                                    </li>
                                    <li className={styles.item}>
                                        <span
                                            className={`${styles.label} text text_type_main-default text_color_inactive`}>Белки, г</span>
                                        <span
                                            className={`${styles.value} text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</span>
                                    </li>
                                    <li className={styles.item}>
                                        <span
                                            className={`${styles.label} text text_type_main-default text_color_inactive`}>Жиры, г</span>
                                        <span
                                            className={`${styles.value} text text_type_digits-default text_color_inactive`}>{ingredient.fat}</span>
                                    </li>
                                    <li className={styles.item}>
                                        <span
                                            className={`${styles.label} text text_type_main-default text_color_inactive`}>Углеводы, г</span>
                                        <span
                                            className={`${styles.value} text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {children}
                    </div>
                </>
            )}
        </Modal>
    );
};

IngredientDetails.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
    ingredient: PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
    }),
};

export default IngredientDetails;
