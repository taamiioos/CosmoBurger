import { ActionTypes } from '../types/ingredients-types';
import ingredientsReducer, { initialState } from './ingredients-reducer';
import { IIngredient } from '../../components/types/components-types';

describe('Проверка редьюсера ingredientsReducer', () => {
    const ingredient: IIngredient = {
        _id: '1',
        name: 'Салат',
        image: '',
        price: 100,
        type: 'bun',
        calories: 200,
        proteins: 400,
        fat: 600,
        carbohydrates: 100,
        uniqueId: '3'
    };

    const ingredientWithCount: IIngredient = {
        ...ingredient,
        count: 2,
    };
    it('Проверка начального состояния', () => {
        expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
    });
    it('Проверка INGREDIENTS_REQUEST', () => {
        const action = {
            type: ActionTypes.INGREDIENTS_REQUEST,
        };
        const expectedState = {
            ...initialState,
            request: true,
            failed: false,
            error: '',
        };
        const result = ingredientsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка INGREDIENTS_SUCCESS', () => {
        const action = {
            type: ActionTypes.INGREDIENTS_SUCCESS,
            payload: [ingredient],
        };
        const expectedState = {
            ...initialState,
            ingredients: [ingredient],
            request: false,
            failed: false,
            error: '',
        };
        const result = ingredientsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка INGREDIENTS_ERROR', () => {
        const action = {
            type: ActionTypes.INGREDIENTS_ERROR,
        };
        const expectedState = {
            ...initialState,
            request: false,
            failed: true,
            error: '',
        };
        const result = ingredientsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка SET_CURRENT_INGREDIENT', () => {
        const action = {
            type: ActionTypes.SET_CURRENT_INGREDIENT,
            payload: ingredient,
        };
        const expectedState = {
            ...initialState,
            currentIngredient: ingredient,
        };
        const result = ingredientsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка CLEAR_CURRENT_INGREDIENT', () => {
        const action = {
            type: ActionTypes.CLEAR_CURRENT_INGREDIENT,
        };
        const expectedState = {
            ...initialState,
            currentIngredient: null,
        };
        const result = ingredientsReducer({ ...initialState, currentIngredient: ingredient }, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка SET_TAB', () => {
        const action = {
            type: ActionTypes.SET_TAB,
            payload: 'bun',
        };
        const expectedState = {
            ...initialState,
            useTab: 'bun',
        };
        const result = ingredientsReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка INCREMENT_INGREDIENT_COUNT', () => {
        const action = {
            type: ActionTypes.INCREMENT_INGREDIENT_COUNT,
            payload: '1',
        };
        const expectedState = {
            ...initialState,
            ingredients: [{ ...ingredientWithCount, count: 3 }],
        };
        const result = ingredientsReducer({ ...initialState, ingredients: [ingredientWithCount] }, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка DECREMENT_INGREDIENT_COUNT', () => {
        const action = {
            type: ActionTypes.DECREMENT_INGREDIENT_COUNT,
            payload: '1',
        };
        const expectedState = {
            ...initialState,
            ingredients: [{ ...ingredientWithCount, count: 1 }],
        };
        const result = ingredientsReducer({ ...initialState, ingredients: [ingredientWithCount] }, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка RESET_INGREDIENT_COUNT', () => {
        const action = {
            type: ActionTypes.RESET_INGREDIENT_COUNT,
        };
        const expectedState = {
            ...initialState,
            ingredients: [{ ...ingredient, count: 0 }],
        };
        const result = ingredientsReducer({ ...initialState, ingredients: [ingredientWithCount] }, action);
        expect(result).toEqual(expectedState);
    });
});
