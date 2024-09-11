import styles from './app-header.module.css';
import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (<div className={styles.container}>
            <header className={styles.headerContainer}>
                <nav>
                    <ul className={styles.ul1}>
                        <li>
                            <BurgerIcon type="primary"/>
                            <span className='text text_type_main-default pl-1'>Конструктор</span>
                        </li>
                        <li>
                            <ListIcon type="secondary"/>
                            <span className='text text_type_main-default text_color_inactive pl-2'>Лента заказов</span>
                        </li>
                    </ul>
                    <div className={styles.logo}>
                        <Logo/>
                    </div>
                    <ul className={styles.ul2}>
                        <li className={styles.profile}>
                            <ProfileIcon type="secondary"/>
                            <span className='text text_type_main-default text_color_inactive pl-2'>Личный кабинет</span>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>);
};

export default AppHeader;
