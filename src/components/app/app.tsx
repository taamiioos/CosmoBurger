import React from 'react';
import styles from './app.module.css';
import {URL} from "../../api/apiConfig";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
    const [data, setData] = React.useState([]);

    React.useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await fetch(`${URL}`);
                const res = await response.json();
                setData(res.data);
            }
            catch (error){
                console.log("Ошибочка при запросе: ", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className={styles.app}>
            <AppHeader />
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor/>
        </div>
    );
}

export default App;
