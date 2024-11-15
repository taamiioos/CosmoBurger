import React, {useEffect, useRef} from "react";
import burgerStyles from "../burger-ingredients/burger-ingredients.module.css";
import {useModal} from '../../hooks/use-modal';
import {setCurrentIngredient, setTab} from '../../services/actions/ingredients-actions';
import Ingredient from './ingredient';
import {useParams, useNavigate, useLocation} from "react-router-dom";
import {useInView} from 'react-intersection-observer';
import {IIngredient} from './../types/components-types';
import { useDispatch, useSelector } from "../../services/store";

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {ingredients, useTab} = useSelector(state => state.ingredients);
    const {openModal} = useModal();
    const {id} = useParams();
    const bunsRef = useRef<HTMLHeadingElement | null>(null);
    const saucesRef = useRef<HTMLHeadingElement | null>(null);
    const fillingsRef = useRef<HTMLHeadingElement | null>(null);
    const [bunsRefCallback, bunsInView] = useInView({threshold: 0});
    const [saucesRefCallback, saucesInView] = useInView({threshold: 0});
    const [fillingsRefCallback, fillingsInView] = useInView({threshold: 0});

    useEffect(() => {
        if (bunsRef.current) bunsRefCallback(bunsRef.current);
        if (saucesRef.current) saucesRefCallback(saucesRef.current);
        if (fillingsRef.current) fillingsRefCallback(fillingsRef.current);
    }, [bunsRefCallback, saucesRefCallback, fillingsRefCallback]);

    const handleModalOpen = (ingredient: IIngredient) => {
        openModal();
        navigate(`/ingredients/${ingredient._id}`, {state: {background: location}});
    };

    useEffect(() => {
        if (id) {
            const ingredient = ingredients.find((ing) => ing._id === id);
            if (ingredient) {
                dispatch(setCurrentIngredient(ingredient));
                openModal();
            }
        }
    }, [id, ingredients, dispatch, openModal]);

    useEffect(() => {
        if (bunsInView) dispatch(setTab("Булки"));
        else if (saucesInView) dispatch(setTab("Соусы"));
        else if (fillingsInView) dispatch(setTab("Начинки"));
    }, [bunsInView, saucesInView, fillingsInView, dispatch]);

    const handleTabChange = (tab: string) => {
        dispatch(setTab(tab));
        const ref = tab === "Булки" ? bunsRef.current : tab === "Соусы" ? saucesRef.current : fillingsRef.current;
        if (ref) {
            ref.scrollIntoView({behavior: "smooth"});
        }
    };

    return (
        <div className={burgerStyles.container} data-testid="burger-ingredients-container">
            <h1 className="text text_type_main-large" data-testid="title">Соберите бургер</h1>
            <div className={burgerStyles.tabs} data-testid="tabs">
                <button
                    className={useTab === "Булки" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Булки")}
                    data-testid="tab-buns">
                    Булки
                </button>
                <button
                    className={useTab === "Соусы" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Соусы")}
                    data-testid="tab-sauces">
                    Соусы
                </button>
                <button
                    className={useTab === "Начинки" ? burgerStyles.active : ""}
                    onClick={() => handleTabChange("Начинки")}
                    data-testid="tab-fillings">
                    Начинки
                </button>
            </div>
            <div className={burgerStyles.tabContent}>
                <div className={burgerStyles.ingredients} data-testid="ingredients-list">
                    <h2 ref={bunsRef} data-testid="section-buns">Булки</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "bun").map((ingredient) => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                            data-testid={`ingredient-bun-${ingredient._id}`}
                        />
                    ))}
                    <h2 ref={saucesRef} data-testid="section-sauces">Соусы</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "sauce").map((ingredient) => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                            data-testid={`ingredient-sauce-${ingredient._id}`}
                        />
                    ))}
                    <h2 ref={fillingsRef} data-testid="section-fillings">Начинки</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "main").map((ingredient) => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                            data-testid={`ingredient-filling-${ingredient._id}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BurgerIngredients;
