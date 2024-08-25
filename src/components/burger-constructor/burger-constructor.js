import React from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = () => {
    const [allPrice, setAllPrice] = React.useState(0);

    React.useEffect(() => {
        const totalPrice = 20 + 30 + 300 + 80 + 80 + 80 + 80 + 80 + 200;
        setAllPrice(totalPrice);
    }, []);

    return (
        <div className={burgerConstructorStyles.container}>
            <div className={burgerConstructorStyles.burgerComponents}>
                <div className={burgerConstructorStyles.elementRow}>
                    <div style={{visibility: 'hidden'}}>
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
                    <div className={burgerConstructorStyles.elementRow}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text="Соус традиционный галактический"
                            price={30}
                            thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"/>
                    </div>

                    <div className={burgerConstructorStyles.elementRow}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text="Мясо бессмертных моллюсков Protostomia"
                            price={300}
                            thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"/>
                    </div>

                    <div className={burgerConstructorStyles.elementRow}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text="Плоды Фалленианского дерева"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"/>
                    </div>

                    <div className={burgerConstructorStyles.elementRow}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    </div>

                    <div className={burgerConstructorStyles.elementRow}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    </div>
                    <div className={burgerConstructorStyles.elementRow}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    </div>
                    <div className={burgerConstructorStyles.elementRow}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text="Хрустящие минеральные кольца"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"/>
                    </div>
                </section>

                <div className={burgerConstructorStyles.elementRow}>
                    <div style={{visibility: 'hidden'}}>
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
                <span style={{display: 'flex', alignSelf: 'center'}} className="text text_type_digits-medium">{allPrice}
                    <span style={{width: '50px', height: '50px'}}><CurrencyIcon type="primary"/></span>
                </span>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
};

export default BurgerConstructor;
