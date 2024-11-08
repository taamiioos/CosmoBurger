import styles from './app-header.module.css';
import {Logo, BurgerIcon, ProfileIcon, ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";

const AppHeader: React.FC = () => {
    const [activeLink, setActiveLink] = useState<string>('');
    const location = useLocation();

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location]);

    return (
        <div className={styles.container}>
            <header className={styles.headerContainer}>
                <nav>
                    <ul className={styles.ul1}>
                        <li>
                            <BurgerIcon type={activeLink === '/' ? "secondary" : "primary"}/>
                            <NavLink
                                to={'/'}
                                className={({isActive}) =>
                                    isActive ? `${styles.link} text text_type_main-default text_color_inactive pl-2` : `${styles.link} text text_type_main-default pl-1`
                                }
                                onClick={() => setActiveLink('/')}
                            >
                                Конструктор
                            </NavLink>
                        </li>
                        <li>
                            <ListIcon type={activeLink === '/feed' ? "secondary" : "primary"}/>
                            <NavLink
                                to={'/feed'}
                                className={({isActive}) =>
                                    isActive ? `${styles.link} text text_type_main-default text_color_inactive pl-2` : `${styles.link} text text_type_main-default pl-1`
                                }
                                onClick={() => setActiveLink('/feed')}
                            >
                                Лента заказов
                            </NavLink>
                        </li>
                    </ul>
                    <NavLink to={'/'}
                             className={styles.logo}>
                        <Logo/>
                    </NavLink>
                    <ul className={styles.ul2}>
                        <li className={styles.profile}>
                            <ProfileIcon type={activeLink === '/profile' ? "secondary" : "primary"}/>
                            <NavLink
                                to={'/profile'}
                                className={({isActive}) =>
                                    isActive ? `${styles.link} text text_type_main-default text_color_inactive pl-2` : `${styles.link} text text_type_main-default pl-1`
                                }
                                onClick={() => setActiveLink('/profile')}
                            >
                                Личный кабинет
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default AppHeader;
