import React from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../modal/order-details/order-details';

const ingredients = [
    {
        text: "Соус традиционный галактический",
        price: 30,
        thumbnail: "https://code.s3.yandex.net/react/code/sauce-03.png"
    },
    {
        text: "Мясо бессмертных моллюсков Protostomia",
        price: 300,
        thumbnail: "https://code.s3.yandex.net/react/code/meat-02.png"
    },
    {text: "Плоды Фалленианского дерева", price: 80, thumbnail: "https://code.s3.yandex.net/react/code/sp_1.png"},
    {
        text: "Хрустящие минеральные кольца",
        price: 80,
        thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    {
        text: "Хрустящие минеральные кольца",
        price: 80,
        thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    {
        text: "Хрустящие минеральные кольца",
        price: 80,
        thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png"
    },
    {
        text: "Хрустящие минеральные кольца",
        price: 80,
        thumbnail: "https://code.s3.yandex.net/react/code/mineral_rings.png"
    }
];

const BurgerConstructor = () => {
    const [allPrice, setAllPrice] = React.useState(0);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    const countPrice = () => {
        let totalPrice = 20 + 30 + 300 + 80 + 80 + 80 + 80 + 80 + 200;
        setAllPrice(totalPrice);
    }

    React.useEffect(() => {
        countPrice()
    }, []);

    return (
        <div className={burgerConstructorStyles.container}>
            <div className={burgerConstructorStyles.burgerComponents}>
                <div className={burgerConstructorStyles.elementRow}>
                    <div className={burgerConstructorStyles.hidden}>
                        <DragIcon type="primary"/>
                    </div>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"/>
                </div>

                <section className={burgerConstructorStyles.burgerScroll}>
                    {ingredients.map((ingredient, index) => (
                        <div className={burgerConstructorStyles.elementRow} key={index}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={ingredient.text}
                                price={ingredient.price}
                                thumbnail={ingredient.thumbnail}/>
                        </div>
                    ))}
                </section>

                <div className={burgerConstructorStyles.elementRow}>
                    <div className={burgerConstructorStyles.hidden}>
                        <DragIcon type="primary"/>
                    </div>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"/>
                </div>
            </div>
            <div className={burgerConstructorStyles.priceComponents}>
                <span className={`${burgerConstructorStyles.iconBlock} text text_type_digits-medium`}>
                    {allPrice}
                    <span><CurrencyIcon type="primary"/></span>
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleModalOpen}>
                    Оформить заказ
                </Button>
            </div>
            {isModalOpen && (
                <OrderDetails onClose={handleCloseModal} numOrder={'034536'}/>
            )}
        </div>
    );
};

export default BurgerConstructor;
