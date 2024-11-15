import {IIngredient} from './../../components/types/components-types';
import {TConstructorActionTypes, ActionTypes} from "../types/constructor-types";

export interface IConstructorState {
    bun: IIngredient | null;
    ingredients: IIngredient[];
    price: number;
    count?: number;
}

export const initialState: IConstructorState = {
    bun: null,
    ingredients: [],
    price: 0
};

const constructorReducer = (state = initialState, action: TConstructorActionTypes): IConstructorState => {
    switch (action.type) {
        case ActionTypes.ADD_INGREDIENT: {
            if (!action.payload) {
                return state;
            }
            return {
                ...state,
                ingredients: [...state.ingredients, {...action.payload.item, count: 1}],
            };
        }
        case ActionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((_, index) => index !== action.payload),
            };
        case ActionTypes.REPLACE_BUN:
            return {
                ...state,
                bun: action.payload || null,
            };
        case ActionTypes.SET_PRICE:
            return {
                ...state,
                price: action.payload || 0,
            };
        case ActionTypes.CLEAR_CONSTRUCTOR: {
            return {
                ...state,
                bun: null,
                ingredients: [],
                price: 0
            };
        }
        case ActionTypes.MOVE_INGREDIENT: {
            const {dragIndex, hoverIndex} = action.payload ?? {dragIndex: 0, hoverIndex: 0};
            const newIngredients = [...state.ingredients];
            const [movedItem] = newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, movedItem);
            return {
                ...state,
                ingredients: newIngredients,
            };
        }
        default:
            return state;
    }
};

export default constructorReducer;