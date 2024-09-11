import React, { useEffect} from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../modal/order-details/order-details';
import { useModal } from '../../hooks/use-modal';
import Modal from '../modal/modal';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, removeIngredient, replaceBun, setPrice, moveIngredient } from '../../services/actions/constructor-actions';
import { makeOrder } from '../../services/actions/order-actions';
import { decrementIngredientCount, incrementIngredientCount } from '../../services/actions/ingredients-actions';
import DraggableIngredient from './draggable-ingredient';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { bun, ingredients, price } = useSelector((state) => state.constructorIngredients);
    const { isModalOpen, openModal, closeModal } = useModal();
    const { orderNumber, orderRequest, orderFailed } = useSelector((state) => state.order);

    const handleOrder = () => {
        const ingredientIds = ingredients.map(ingredient => ingredient._id);
        dispatch(makeOrder(ingredientIds));
    };

    useEffect(() => {
        if (orderNumber && !orderRequest && !orderFailed) {
            openModal();
        }
    }, [orderNumber, orderRequest, orderFailed]);

    const totalPrice = React.useMemo(() => {
        let totalPrice = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
        if (bun) {
            totalPrice += bun.price * 2;
        }
        return totalPrice;
    }, [ingredients, bun]);

    React.useEffect(() => {
        dispatch(setPrice(totalPrice));
    }, [totalPrice, dispatch]);

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            if (item.type === 'bun') {
                if (bun) {
                    dispatch(decrementIngredientCount(bun._id));
                }
                dispatch(replaceBun(item));
                dispatch(incrementIngredientCount(item._id));
            } else {
                dispatch(addIngredient(item));
                dispatch(incrementIngredientCount(item._id));
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
    });

    const handleRemoveIngredient = (index, ingredientId) => {
        dispatch(removeIngredient(index));
        dispatch(decrementIngredientCount(ingredientId));
    };

    const handleMoveIngredient = (dragIndex, hoverIndex) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    };
    return (
        <div className={burgerConstructorStyles.container} ref={dropTarget}>
            <div className={burgerConstructorStyles.burgerComponents}>
            {bun && (
                <div className={burgerConstructorStyles.elementRow}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}

            <section className={burgerConstructorStyles.burgerScroll}>
                {ingredients.map((ingredient, index) => (
                    <DraggableIngredient
                        key={`${ingredient._id}-${index}`}
                        index={index}
                        ingredient={ingredient}
                        moveIngredient={handleMoveIngredient}
                        handleRemoveIngredient={handleRemoveIngredient}
                    />
                ))}

            </section>

            {bun && (
                <div className={burgerConstructorStyles.elementRow}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </div>
            )}
            </div>

            <div className={burgerConstructorStyles.priceComponents}>
                <span className={`${burgerConstructorStyles.iconBlock} text text_type_digits-medium`}>
                    {price}
                    <span><CurrencyIcon type="primary" /></span>
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleOrder}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && (<Modal onClose={closeModal}>
                <OrderDetails />
            </Modal>)}
        </div>
    );
};

export default BurgerConstructor;
