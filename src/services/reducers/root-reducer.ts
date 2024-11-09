import {combineReducers} from 'redux';
import ingredientsReducer from './ingredients-reducer';
import constructorReducer from './constructor-reducer';
import orderReducer from './order-reducer';
import passwordReducer from './password-reducer';
import authReducer from './auth-reducer';
import profileReducer from './profile-reducer';
import wsReducer from './ws-reducer';
import {TAuthActionTypes} from './../types/auth-types';
import {TConstructorActionTypes} from "../types/constructor-types";
import {TOrderActionTypes} from "../types/order-types";
import {TIngredientsActionTypes} from "../types/ingredients-types";
import {TPasswordActionTypes} from "../types/password-types";
import {TProfileActionTypes} from "../types/profile-types";
import {WebSocketActions} from '../types/ws-types';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorReducer,
    order: orderReducer,
    passwordForgot: passwordReducer,
    authUser: authReducer,
    profile: profileReducer,
    ws: wsReducer
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export type AppActions =
    | TConstructorActionTypes
    | TAuthActionTypes
    | TOrderActionTypes
    | TIngredientsActionTypes
    | TPasswordActionTypes
    | TProfileActionTypes
    | WebSocketActions;
