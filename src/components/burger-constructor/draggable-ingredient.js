import React, { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from "./burger-constructor.module.css";
import PropTypes from 'prop-types';
import {common} from '../types/common';

const DraggableIngredient = ({ ingredient, index, moveIngredient, handleRemoveIngredient }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'constructor-ingredient',
        hover(item) {
            const dragIndex = item.index;
            const hoverIndex = index;
            moveIngredient(dragIndex, hoverIndex);
            item.index = hoverIndex;},
    });
    const [, drag] = useDrag({
        type: 'constructor-ingredient',
        item: { ...ingredient, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} className={burgerConstructorStyles.elementRow}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => handleRemoveIngredient(index, ingredient._id)}
            />
        </div>
    );
};

DraggableIngredient.propTypes = {
    ingredient: common.isRequired,
    index: PropTypes.number.isRequired,
    moveIngredient: PropTypes.func.isRequired,
    handleRemoveIngredient: PropTypes.func.isRequired,
};
export default DraggableIngredient;
