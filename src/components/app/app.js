import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Registration from '../registration/registration';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ForgotPassword from '../forgot-password/forgot-password';
import Login from '../login/login';
import Profile from '../profile/profile';
import ResetPassword from '../reset-password/reset-password';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Routes, Route, Navigate, useLocation, useNavigate} from 'react-router-dom';
import {ProtectedRouteElement} from '../protected-element/protected-route-element';
import {RestrictedRoute} from '../protected-element/restricted-route';
import {useSelector} from 'react-redux';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import IngredientDetailsPage from '../modal/ingredient-details/ingrdient-detail-page';
import Page404 from '../404page/404page';
import {useModal} from '../../hooks/use-modal';
import Modal from '../modal/modal';

const App = () => {
    const {hasVisitedForgotPassword} = useSelector(state => state.authUser);
    const navigate = useNavigate();
    const {isModalOpen, closeModal} = useModal();
    const {ingredients} = useSelector((state) => state.ingredients);
    const location = useLocation();
    const background = location.state?.background;
    const closeModalIngredient = () => {
        closeModal();
        navigate(background ? background.pathname : '/');
    };

    return (
        <div className={styles.app}>
            <AppHeader/>
            <Routes location={background || location}>
                <Route path="/register" element={
                    <RestrictedRoute>
                        <Registration/>
                    </RestrictedRoute>
                }/>
                <Route path="/login" element={
                    <RestrictedRoute>
                        <Login/>
                    </RestrictedRoute>
                }/>
                <Route path="/forgot-password" element={
                    <RestrictedRoute>
                        <ForgotPassword/>
                    </RestrictedRoute>
                }/>
                <Route path="/reset-password" element={
                    <RestrictedRoute>
                        {hasVisitedForgotPassword ? <ResetPassword/> : <Navigate to="/forgot-password" replace/>}
                    </RestrictedRoute>
                }/>
                <Route path="/" element={
                    <ProtectedRouteElement>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
                    </ProtectedRouteElement>
                }/>
                <Route path="/profile/*" element={
                    <ProtectedRouteElement>
                        <Profile/>
                    </ProtectedRouteElement>
                }/>

                <Route
                    path="/ingredients/:id"
                    element={<IngredientDetailsPage
                        ingredient={ingredients.find(ing => ing._id === location.pathname.split("/").pop())}/>}
                />
                <Route path="*" element={<Page404/>}/>
            </Routes>
            {background && isModalOpen && (
                <Modal onClose={closeModalIngredient}>
                    <IngredientDetails
                        ingredient={ingredients.find(ing => ing._id === location.pathname.split("/").pop())}
                    />
                </Modal>
            )}
        </div>
    );
};

export default App;
