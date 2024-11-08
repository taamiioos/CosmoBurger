import React, {useState, useEffect} from "react";
import styles from "./profile.module.css";
import {useSelector} from 'react-redux';
import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {getUser, updateUser} from '../../../services/actions/profile-actions';
import {logoutUser} from '../../../services/actions/auth-actions';
import {Link, useNavigate, useLocation, NavLink} from 'react-router-dom';
import {RootState} from '../../../services/reducers/root-reducer';
import OrderHistory from "../../order-history/order-history";
import {useAppDispatch} from "../../../services/store";

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const {email, name, successGet} = useSelector((state: RootState) => state.profile);
    const {successLogout, isAuth} = useSelector((state: RootState) => state.authUser);
    const [localName, setLocalName] = useState<string>('');
    const [localEmail, setLocalEmail] = useState<string>('');
    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (successLogout) {
            navigate('/login');
        }
    }, [successLogout, navigate]);

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    useEffect(() => {
        if (successGet) {
            setLocalName(name || '');
            setLocalEmail(email || '');
        }
    }, [email, name, successGet]);

    const handleExit = () => {
        dispatch(logoutUser());
    };

    const handleSave = () => {
        dispatch(updateUser(localName, localEmail));
        setIsEditingName(false);
        setIsEditingEmail(false);
    };

    const handleCancel = () => {
        setLocalName(name);
        setLocalEmail(email);
        setIsEditingName(false);
        setIsEditingEmail(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'name') {
            setLocalName(value);
        } else if (name === 'email') {
            setLocalEmail(value);
        }
    };

    return (
        <section className={styles.all}>
            <section className={styles.container}>
                <div className={styles.menu}>
                    <Link to={'/profile'} className={`${styles.menuElement} text text_type_main-medium`}>Профиль</Link>
                    <NavLink
                        to={'/profile/orders'}
                        className={({isActive}) =>
                            isActive ? `${styles.menuElement} text text_type_main-medium` : `${styles.menuElement} text text_type_main-medium`
                        }
                    >
                        История заказов
                    </NavLink>
                    <Link to={'/'} onClick={handleExit}
                          className={`${styles.menuElement} text text_type_main-medium`}>Выход</Link>
                </div>

                {location.pathname === '/profile' && (
                    <div className={styles.inputs}>
                        <Input
                            value={localName || ''}
                            type={'text'}
                            placeholder={'Имя'}
                            name={'name'}
                            icon={isEditingName ? 'CloseIcon' : 'EditIcon'}
                            onIconClick={() => setIsEditingName(true)}
                            onBlur={() => setIsEditingName(false)}
                            disabled={!isEditingName}
                            onChange={handleInputChange}
                        />
                        <Input
                            value={localEmail || ''}
                            name={'email'}
                            placeholder="Логин"
                            onChange={handleInputChange}
                            icon={isEditingEmail ? 'CloseIcon' : 'EditIcon'}
                            onIconClick={() => setIsEditingEmail(true)}
                            onBlur={() => setIsEditingEmail(false)}
                            disabled={!isEditingEmail}
                        />
                        <PasswordInput
                            value={''}
                            placeholder={'Пароль'}
                            name={'password'}
                            errorText={'Ошибка'}
                            disabled={true}
                            onChange={() => {
                            }}
                        />
                    </div>
                )}

                {location.pathname === '/profile/orders' && (
                    <div className={styles.orders}>
                        <OrderHistory/>
                    </div>
                )}
            </section>

            {location.pathname === '/profile' && (
                <>
                    <div className={styles.buttons}>
                        <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
                            Отмена
                        </Button>
                        <Button htmlType="submit" type="primary" size="medium" onClick={handleSave}>
                            Сохранить
                        </Button>
                    </div>
                    <p className={`${styles.textProfile} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </>
            )}
        </section>
    );
};

export default Profile;
