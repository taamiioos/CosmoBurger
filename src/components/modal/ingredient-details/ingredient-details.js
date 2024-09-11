import React from 'react';
import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const ingredient = useSelector((state)=>state.ingredients.currentIngredient)
    return (
        <div className={styles.modalContent}>
            {ingredient && (
                <div>
                    <div className={styles.imageContainer}>
                        <img className={styles.ingredientImage} src={ingredient.image}
                             alt={ingredient.name}/>
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
        </div>
    );
};

export default IngredientDetails;
