import React from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { data } from "../../utils/data";

function App() {
    return (
        <div className="App">
            <AppHeader />
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor/>
        </div>
    );
}

export default App;
