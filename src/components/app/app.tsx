import React, {useEffect} from "react";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import Registration from '../pages/registration/registration';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ForgotPassword from '../pages/forgot-password/forgot-password';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';
import ResetPassword from '../pages/reset-password/reset-password';
import {DndProvider} from 'react-dnd';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {ProtectedRouteElement} from '../protected-element/protected-route-element';
import {RestrictedRoute} from '../protected-element/restricted-route';
import IngredientDetails from '../modal/ingredient-details/ingredient-details';
import Page404 from '../pages/404page/404page';
import {Navigate} from 'react-router-dom';
import Modal from '../modal/modal';
import {setIngredients} from '../../services/actions/ingredients-actions';
import Feed from "../pages/feed/feed";
import OrdersInfo from "../modal/orders-info/orders-info";
import {useModal} from "../../hooks/use-modal";
import { useDispatch, useSelector } from "../../services/store";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {hasVisitedForgotPassword} = useSelector(state => state.authUser);
    const location = useLocation();
    const {closeModal} = useModal();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(setIngredients());
    }, [dispatch]);

    const closeModalIngredient = () => {
        closeModal();
        navigate(background ? background.pathname : '/');
    };

    const closeModalFeed = () => {
        closeModal();
        navigate(background ? background.pathname : '/feed');
    };

    const closeModalFeedProfile = () => {
        closeModal();
        navigate(background ? background.pathname : '/profile/orders');
    };

    return (
        <div className={styles.app} data-testid="main-page">
            <AppHeader data-testid="app-header"/>
            <Routes location={background || location}>
                <Route path="/register" element={
                    <RestrictedRoute data-testid="register-route">
                        <Registration/>
                    </RestrictedRoute>
                }/>
                <Route path="/login" element={
                    <RestrictedRoute data-testid="login-route">
                        <Login/>
                    </RestrictedRoute>
                }/>
                <Route path="/forgot-password" element={
                    <RestrictedRoute data-testid="forgot-password-route">
                        <ForgotPassword/>
                    </RestrictedRoute>
                }/>
                <Route path="/reset-password" element={
                    <RestrictedRoute data-testid="reset-password-route">
                        {hasVisitedForgotPassword ? <ResetPassword/> : <Navigate to="/forgot-password" replace/>}
                    </RestrictedRoute>
                }/>
                <Route path="/feed" element={<Feed data-testid="feed-route"/>}/>
                <Route path="/" element={
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients data-testid="burger-ingredients"/>
                        <BurgerConstructor data-testid="burger-constructor"/>
                    </DndProvider>
                }/>
                <Route path="/profile/*" element={
                    <ProtectedRouteElement data-testid="profile-route">
                        <Profile/>
                    </ProtectedRouteElement>
                }/>
                <Route path="/ingredients/:id" element={
                    <div className={styles.pageStyle} data-testid="ingredient-details-page">
                        <IngredientDetails/>
                    </div>
                }/>
                <Route path="/feed/:id" element={
                    <div className={styles.pageStyle} data-testid="order-info-page">
                        <OrdersInfo/>
                    </div>
                }/>
                <Route path="/profile/orders/:id" element={
                    <div className={styles.pageStyle} data-testid="order-info-page">
                        <OrdersInfo/>
                    </div>
                }/>
                <Route path="*" element={<Page404 data-testid="404-page"/>}/>
            </Routes>

            {background && (
                <Routes>
                    <Route path="/ingredients/:id" element={
                        <Modal title="Детали ингредиента" onClose={closeModalIngredient} data-testid="ingredient-modal">
                            <IngredientDetails/>
                        </Modal>
                    }/>
                    <Route path="/feed/:id" element={
                        <Modal title="" onClose={closeModalFeed} data-testid="order-info-modal">
                            <OrdersInfo/>
                        </Modal>
                    }/>
                    <Route path="/profile/orders/:id" element={
                        <Modal title="" onClose={closeModalFeedProfile} data-testid="order-info-modal">
                            <OrdersInfo/>
                        </Modal>
                    }/>
                </Routes>
            )}
        </div>
    );
};

export default App;
