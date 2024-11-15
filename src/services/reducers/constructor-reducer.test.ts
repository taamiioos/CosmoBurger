import {IIngredient} from "../../components/types/components-types";
import {ActionTypes} from "../types/constructor-types";
import constructorReducer, {initialState} from "./constructor-reducer";

describe('Проверка редьюсера constructorReducer', () => {
    const ingredient: IIngredient = {
        _id: '1',
        uniqueId: '1',
        name: 'Салат',
        count: 3,
        price: 100,
        type: 'bun',
        image: '',
        calories: 200,
        proteins: 400,
        fat: 600,
        carbohydrates: 100,
    };

    it('Проверка начального состояния', () => {
        expect(constructorReducer(undefined, {} as any)).toEqual(initialState);
    });
    it('Проверка ADD_INGREDIENT', () => {
        const action = {
            type: ActionTypes.ADD_INGREDIENT,
            payload: {
                item: ingredient,
            },
        };
        const expectedState = {
            ...initialState,
            ingredients: [{...ingredient, count: 1}],
        };
        const result = constructorReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка REMOVE_INGREDIENT', () => {
        const initialStateWithIngredients = {
            ...initialState,
            ingredients: [{...ingredient, count: 1}],
        };
        const action = {
            type: ActionTypes.REMOVE_INGREDIENT,
            payload: 0,
        };
        const expectedState = {
            ...initialStateWithIngredients,
            ingredients: [],
        };
        const result = constructorReducer(initialStateWithIngredients, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка REPLACE_BUN', () => {
        const bun: IIngredient = {
            _id: '2',
            uniqueId: '2',
            name: 'булка',
            count: 3,
            price: 100,
            type: 'bun',
            image: '',
            calories: 200,
            proteins: 400,
            fat: 600,
            carbohydrates: 100,
        };
        const action = {
            type: ActionTypes.REPLACE_BUN,
            payload: bun,
        };
        const expectedState = {
            ...initialState,
            bun,
        };
        const result = constructorReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка SET_PRICE', () => {
        const action = {
            type: ActionTypes.SET_PRICE,
            payload: 500,
        };
        const expectedState = {
            ...initialState,
            price: 500,
        };
        const result = constructorReducer(initialState, action);
        expect(result).toEqual(expectedState);
    });
    it('Проверка CLEAR_CONSTRUCTOR', () => {
        const initialStateWithBunAndIngredients = {
            ...initialState,
            bun: ingredient,
            ingredients: [ingredient],
            price: 1000,
        };
        const action = {
            type: ActionTypes.CLEAR_CONSTRUCTOR,
        };
        const expectedState = {
            ...initialState,
        };
        const result = constructorReducer(initialStateWithBunAndIngredients, action);
        expect(result).toEqual(expectedState);
    });

    it('Проверка MOVE_INGREDIENT', () => {
        const ingredient1: IIngredient = {
            _id: '1',
            uniqueId: '1',
            name: 'Салат',
            count: 1,
            price: 100,
            type: 'main',
            image: '',
            calories: 200,
            proteins: 400,
            fat: 600,
            carbohydrates: 100,
        };
        const ingredient2: IIngredient = {
            _id: '3',
            uniqueId: '3',
            name: 'Помидор',
            count: 1,
            price: 50,
            type: 'main',
            image: '',
            calories: 50,
            proteins: 100,
            fat: 200,
            carbohydrates: 30,
        };
        const initialStateWithIngredients = {
            ...initialState,
            ingredients: [ingredient1, ingredient2],
        };
        const action = {
            type: ActionTypes.MOVE_INGREDIENT,
            payload: {dragIndex: 0, hoverIndex: 1},
        };
        const expectedState = {
            ...initialStateWithIngredients,
            ingredients: [ingredient2, ingredient1],
        };
        const result = constructorReducer(initialStateWithIngredients, action);
        expect(result).toEqual(expectedState);
    });
});
