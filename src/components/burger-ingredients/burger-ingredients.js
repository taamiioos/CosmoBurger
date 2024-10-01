import React, {useEffect} from "react";
import burgerStyles from "../burger-ingredients/burger-ingredients.module.css";
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import {useModal} from '../../hooks/use-modal';
import Modal from '../modal/modal';
import {useDispatch, useSelector} from 'react-redux';
import {
    setIngredients,
    setCurrentIngredient,
    clearCurrentIngredient,
    setTab
} from '../../services/actions/ingredients-actions';
import Ingredient from './ingredient';
import {useParams, useNavigate, useLocation} from "react-router-dom";

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {ingredients, currentIngredient, useTab} = useSelector((state) => state.ingredients);
    const {isModalOpen, openModal, closeModal} = useModal();
    const {id} = useParams();
    const bunsRef = React.useRef(null);
    const saucesRef = React.useRef(null);
    const fillingsRef = React.useRef(null);
    const tabs = {"Булки": bunsRef, "Соусы": saucesRef, "Начинки": fillingsRef};

    const handleModalOpen = (ingredient) => {
        dispatch(setCurrentIngredient(ingredient));
        openModal(true);
        navigate(`/ingredients/${ingredient._id}`, {state: {background: location}});
    };

    const handleCloseModal = () => {
        dispatch(clearCurrentIngredient());
        closeModal();
        navigate('/');
    };

    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(setIngredients());
        }
    }, [dispatch, ingredients]);

    useEffect(() => {
        if (id) {
            const ingredient = ingredients.find((ing) => ing._id === id);
            if (ingredient) {
                dispatch(setCurrentIngredient(ingredient));
                openModal(true);
            } else {
                dispatch(setIngredients()).then(() => {
                    const loadedIngredient = ingredients.find((ing) => ing._id === id);
                    if (loadedIngredient) {
                        dispatch(setCurrentIngredient(loadedIngredient));
                        openModal(true);
                    }
                });
            }
        }
    }, [id, ingredients, dispatch, openModal]);

    const handleTabChange = (tab) => {
        dispatch(setTab(tab));
        const ref = tabs[tab].current;
        if (ref) {
            ref.scrollIntoView({behavior: "smooth"});
        }
    };
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
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                        />
                    ))}
                    <h2 ref={saucesRef}>Соусы</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "sauce").map((ingredient) => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                        />
                    ))}
                    <h2 ref={fillingsRef}>Начинки</h2>
                    {ingredients.filter((ingredient) => ingredient.type === "main").map((ingredient) => (
                        <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            handleModalOpen={handleModalOpen}
                        />
                    ))}
                </div>
            </div>
            {isModalOpen && currentIngredient && (
                <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                    <IngredientDetails ingredient={currentIngredient}/>
                </Modal>
            )}
        </div>
    );
};

export default BurgerIngredients;
