import React, { useEffect } from "react";
import PropTypes from "prop-types";
import burgerStyles from "../burger-ingredients/burger-ingredients.module.css";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import { useModal } from '../../hooks/use-modal';
import {common} from '../types/common';
import Modal from '../modal/modal';


const BurgerIngredients = ({ ingredients }) => {
    const [useTab, setUseTab] = React.useState("Булки");
    const [clickIngredient, setClickIngredient] = React.useState(null);
    const { isModalOpen, openModal, closeModal } = useModal();

    const handleModalOpen = (ingredient) => {
        setClickIngredient(ingredient);
        openModal(true);
    }

    const handleCloseModal = () => {
        setClickIngredient(null);
        closeModal(false);
    }

    const bunsRef = React.useRef(null);
    const saucesRef = React.useRef(null);
    const fillingsRef = React.useRef(null);

    const handleTabChange = (tab) => {
        setUseTab(tab);
        if (tab === "Булки" && bunsRef.current) {
            bunsRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (tab === "Соусы" && saucesRef.current) {
            saucesRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (tab === "Начинки" && fillingsRef.current) {
            fillingsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        const saucesTop = saucesRef.current.getBoundingClientRect().top;
        const fillingsTop = fillingsRef.current.getBoundingClientRect().top;
        if (fillingsTop < 150) {
            setUseTab("Начинки");
        } else if (saucesTop < 150) {
            setUseTab("Соусы");
        } else {
            setUseTab("Булки");
        }
    };

    useEffect(() => {
        const container = document.querySelector(`.${burgerStyles.ingredients}`);
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={burgerStyles.container}>
            <h1 className="text text_type_main-large">Соберите бургер</h1>
            <div className={burgerStyles.tabs}>
                <button
                    className={useTab === "Булки" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Булки")}>
                    Булки
                </button>
                <button
                    className={useTab === "Соусы" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Соусы")}>
                    Соусы
                </button>
                <button
                    className={useTab === "Начинки" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Начинки")}>
                    Начинки
                </button>
            </div>
            <div className={burgerStyles.tabContent}>
                <div className={burgerStyles.ingredients}>
                    <h2 ref={bunsRef}>Булки</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "bun").map((ingredient) => (
                        <div key={ingredient._id} className={burgerStyles.ingredientItem} onClick={() => handleModalOpen(ingredient)}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            {(ingredient._id === "60666c42cc7b410027a1a9b1") && (
                                <Counter count={1} size="default" extraClass="m-1" />
                            )}
                            <span className={burgerStyles.priceBlock}>
                                <p>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </span>
                            <p>{ingredient.name}</p>
                        </div>
                    ))}

                    <h2 ref={saucesRef}>Соусы</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "sauce").map((ingredient) => (
                        <div key={ingredient._id} className={burgerStyles.ingredientItem} onClick={() => handleModalOpen(ingredient)}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            <span className={burgerStyles.priceBlock}>
                                <p>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </span>
                            <p>{ingredient.name}</p>
                        </div>
                    ))}

                    <h2 ref={fillingsRef}>Начинки</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "main").map((ingredient) => (
                        <div key={ingredient._id} className={burgerStyles.ingredientItem} onClick={() => handleModalOpen(ingredient)}>
                            <img src={ingredient.image} alt={ingredient.name} />
                            <span className={burgerStyles.priceBlock}>
                                <p>{ingredient.price}</p>
                                <CurrencyIcon type="primary" />
                            </span>
                            <p>{ingredient.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && clickIngredient && (
                <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                    <IngredientDetails ingredient={clickIngredient} />
                </Modal>
            )}
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(common).isRequired,
};

export default BurgerIngredients;
