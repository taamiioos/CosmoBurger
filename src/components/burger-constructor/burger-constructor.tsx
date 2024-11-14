import React, {useEffect} from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../modal/order-details/order-details';
import {useModal} from '../../hooks/use-modal';
import Modal from '../modal/modal';
import {useDrop} from 'react-dnd';
import {
    addIngredient,
    removeIngredient,
    replaceBun,
    setPrice,
    moveIngredient,
    clearConstructor
} from '../../services/actions/constructor-actions';
import {makeOrder} from '../../services/actions/order-actions';
import {decrementIngredientCount, incrementIngredientCount} from '../../services/actions/ingredients-actions';
import DraggableIngredient from './draggable-ingredient';
import {ClipLoader} from 'react-spinners';
import {useNavigate} from 'react-router-dom';
import {IIngredient} from './../types/components-types';
import {useDispatch, useSelector} from "../../services/store";

const BurgerConstructor: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {bun, ingredients, price} = useSelector(state => state.constructorIngredients);
    const {isModalOpen, openModal, closeModal} = useModal();
    const {orderNumber, orderRequest, orderFailed} = useSelector(state => state.order);
    const {isAuth} = useSelector(state => state.authUser);

    const handleOrder = async () => {
        if (!isAuth) {
            navigate("/login", {state: {from: "/"}});
            return;
        }
        const ingredientIds: string[] = [];
        if (bun) {
            ingredientIds.push(bun._id);
            ingredientIds.push(bun._id);
        }
        ingredientIds.push(...ingredients.map(ingredient => ingredient._id));
        try {
            dispatch(makeOrder(ingredientIds));
            dispatch(clearConstructor());
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (orderNumber && !orderRequest && !orderFailed) {
            openModal();
        }
    }, [orderNumber, orderRequest, orderFailed, openModal]);

    const totalPrice = React.useMemo(() => {
        let totalPrice = ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
        if (bun) {
            totalPrice += bun.price * 2;
        }
        return totalPrice;
    }, [ingredients, bun]);

    useEffect(() => {
        dispatch(setPrice(totalPrice));
    }, [totalPrice, dispatch]);

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item: IIngredient) {
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
    });

    const handleRemoveIngredient = (index: number, ingredientId: string) => {
        dispatch(removeIngredient(index));
        dispatch(decrementIngredientCount(ingredientId));
    };

    const handleMoveIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(moveIngredient(dragIndex, hoverIndex));
    };

    return (
        <div className={burgerConstructorStyles.container} ref={dropTarget} data-testid="burger-constructor-container">
            <div className={burgerConstructorStyles.burgerComponents} data-testid="burger-components">
                {bun && (
                    <div className={burgerConstructorStyles.elementRow} data-testid="bun-top">
                        <div className={burgerConstructorStyles.bun}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                                data-testid="bun-top-element"
                            />
                        </div>
                    </div>
                )}

                <section className={burgerConstructorStyles.burgerScroll} data-testid="ingredients-list">
                    {ingredients.map((ingredient: IIngredient, index: number) => (
                        <DraggableIngredient
                            key={ingredient.uniqueId}
                            index={index}
                            ingredient={ingredient}
                            moveIngredient={handleMoveIngredient}
                            handleRemoveIngredient={handleRemoveIngredient}
                            data-testid={`ingredient-${ingredient.uniqueId}`}
                        />
                    ))}
                </section>

                {bun && (
                    <div className={burgerConstructorStyles.elementRow} data-testid="bun-bottom">
                        <div className={burgerConstructorStyles.bun}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                                data-testid="bun-bottom-element"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className={burgerConstructorStyles.priceComponents} data-testid="price-components">
                <span className={`${burgerConstructorStyles.iconBlock} text text_type_digits-medium`} data-testid="total-price">
                    {price}
                    <span><CurrencyIcon type="primary" data-testid="currency-icon" /></span>
                </span>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={handleOrder}
                    disabled={orderRequest || !bun}
                    data-testid="order-button"
                >
                    {orderRequest ? <ClipLoader data-testid="loader" /> : 'Оформить заказ'}
                </Button>
            </div>

            {isModalOpen && (
                <Modal onClose={closeModal} title={""} data-testid="order-modal">
                    <OrderDetails data-testid="order-details" />
                </Modal>
            )}
        </div>
    );
};

export default BurgerConstructor;
