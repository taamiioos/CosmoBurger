import { compose, createStore, applyMiddleware, Store, ActionCreator, Action } from 'redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState, AppActions } from './reducers/root-reducer';
import { wsMiddleware } from './../services/middleware/socket';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { ThunkAction } from 'redux-thunk';

type TApplicationActions = AppActions;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, RootState, unknown, TApplicationActions>;
export type AppStore = Store<RootState, TApplicationActions>;

const composeEnhancers =
    (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware));

export const store: AppStore = createStore(rootReducer, enhancer);

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
