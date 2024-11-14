import React from 'react';
import {useParams} from 'react-router-dom';
import styles from './ingredient-details.module.css';
import {useSelector} from '../../../services/store';

const IngredientDetails: React.FC = () => {
    const {id} = useParams();
    const ingredients = useSelector(state => state.ingredients.ingredients);
    const ingredient = ingredients.find((item) => item._id === id);

    if (!ingredient) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.modalContent} data-testid="ingredient-details">
            <div>
                <div className={styles.imageContainer}>
                    <img
                        className={styles.ingredientImage}
                        src={ingredient.image}
                        alt={ingredient.name}
                        data-testid="ingredient-image"
                    />
                </div>
                <h3 className={`${styles.ingredientName} text text_type_main-medium`} data-testid="ingredient-name">
                    {ingredient.name}
                </h3>
                <ul className={styles.characteristics} data-testid="ingredient-characteristics">
                    <li className={styles.item} data-testid="ingredient-calories">
                        <span className={`${styles.label} text text_type_main-default text_color_inactive`} data-testid="ingredient-calories-label">
                            Калории, ккал
                        </span>
                        <span className={`${styles.value} text text_type_digits-default text_color_inactive`} data-testid="ingredient-calories-value">
                            {ingredient.calories}
                        </span>
                    </li>
                    <li className={styles.item} data-testid="ingredient-proteins">
                        <span className={`${styles.label} text text_type_main-default text_color_inactive`} data-testid="ingredient-proteins-label">
                            Белки, г
                        </span>
                        <span className={`${styles.value} text text_type_digits-default text_color_inactive`} data-testid="ingredient-proteins-value">
                            {ingredient.proteins}
                        </span>
                    </li>
                    <li className={styles.item} data-testid="ingredient-fat">
                        <span className={`${styles.label} text text_type_main-default text_color_inactive`} data-testid="ingredient-fat-label">
                            Жиры, г
                        </span>
                        <span className={`${styles.value} text text_type_digits-default text_color_inactive`} data-testid="ingredient-fat-value">
                            {ingredient.fat}
                        </span>
                    </li>
                    <li className={styles.item} data-testid="ingredient-carbohydrates">
                        <span className={`${styles.label} text text_type_main-default text_color_inactive`} data-testid="ingredient-carbohydrates-label">
                            Углеводы, г
                        </span>
                        <span className={`${styles.value} text text_type_digits-default text_color_inactive`} data-testid="ingredient-carbohydrates-value">
                            {ingredient.carbohydrates}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default IngredientDetails;
