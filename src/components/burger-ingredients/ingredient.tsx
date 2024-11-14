import React from "react";
import burgerStyles from "../burger-ingredients/burger-ingredients.module.css";
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from 'react-dnd';
import {IIngredientProps} from './../types/components-types';

const Ingredient: React.FC<IIngredientProps> = ({ingredient, handleModalOpen}) => {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div
            className={burgerStyles.ingredientItem}
            ref={dragRef}
            onClick={() => handleModalOpen(ingredient)}
            data-testid={`ingredient-item-${ingredient._id}`}
        >
            <img
                src={ingredient.image}
                alt={ingredient.name}
                data-testid={`ingredient-image-${ingredient._id}`}
            />

            {ingredient.count && ingredient.count > 0 && (
                <Counter
                    count={ingredient.count}
                    size="default"
                    extraClass="m-1"
                    data-testid={`ingredient-counter-${ingredient._id}`}
                />
            )}

            <span className={burgerStyles.priceBlock} data-testid={`ingredient-price-${ingredient._id}`}>
                <p>{ingredient.price}</p>
                <CurrencyIcon type="primary"/>
            </span>

            <p data-testid={`ingredient-name-${ingredient._id}`}>{ingredient.name}</p>
        </div>
    );
};

export default Ingredient;
