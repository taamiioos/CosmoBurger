import {compose, createStore, applyMiddleware, Store} from 'redux';
import {thunk, ThunkDispatch} from 'redux-thunk';
import rootReducer, {RootState, AppActions} from './reducers/root-reducer';
import {wsMiddleware} from './../services/middleware/socket';
import {useDispatch} from 'react-redux';

export type AppStore = Store<RootState, AppActions>;
const composeEnhancers =
    (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, wsMiddleware));
export const store: AppStore = createStore(rootReducer, enhancer);
export type AppDispatch = ThunkDispatch<RootState, any, AppActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
