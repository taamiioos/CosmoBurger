import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentIngredient, setIngredients} from '../../../services/actions/ingredients-actions';
import IngredientDetails from './ingredient-details';
import styles from './ingredient-details.module.css';

const IngredientDetailsPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {ingredients, currentIngredient} = useSelector((state) => state.ingredients);

    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(setIngredients());
        }
    }, [dispatch, ingredients]);

    useEffect(() => {
        if (id && ingredients.length > 0) {
            const ingredient = ingredients.find((ing) => ing._id === id);
            if (ingredient) {
                dispatch(setCurrentIngredient(ingredient));
            } else {
                navigate('/');
            }
        }
    }, [id, ingredients, dispatch, navigate]);

    return (
        <div className={styles.ingredientPage}>
            <h1 className="text text_type_main-large">Детали ингредиента</h1>
            <IngredientDetails ingredient={currentIngredient}/>
        </div>
    );
};

export default IngredientDetailsPage;
