import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { getUser, updateUser } from '../../services/actions/profile-actions';
import { logoutUser } from '../../services/actions/auth-actions';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const { email, name, successGet } = useSelector((state) => state.profile);
    const { successLogout, isAuth } = useSelector((state) => state.authUser);
    const [localName, setLocalName] = useState('');
    const [localEmail, setLocalEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleExit = () => {
        dispatch(logoutUser());
    };

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
            setLocalEmail(email || '');}
    }, [email, name, successGet]);

    const handleSave = () => {
        dispatch(updateUser(localName, localEmail));
        setIsEditing(false);
        setIsChanged(false);
    };

    const handleCancel = () => {
        setLocalName(name);
        setLocalEmail(email);
        setIsEditing(false);
        setIsChanged(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setLocalName(value);
        } else if (name === 'email') {
            setLocalEmail(value);
        }
        setIsChanged(true);
    };


    return (
        <section className={styles.all}>
            <section className={styles.container}>
                <div className={styles.menu}>
                    <Link to={'/profile'} className={`${styles.menuElement} text text_type_main-medium`}>Профиль</Link>
                    <Link to={'/profile/orders'} className={`${styles.menuElement} text text_type_main-medium`}>История заказов</Link>
                    <Link onClick={handleExit} className={`${styles.menuElement} text text_type_main-medium`}>Выход</Link>
                </div>
                {location.pathname === '/profile' && (
                    <div className={styles.inputs}>
                        <Input
                            value={localName || ''}
                            type={'text'}
                            placeholder={'Имя'}
                            name={'name'}
                            icon={'EditIcon'}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                        />
                        <EmailInput
                            value={localEmail || ''}
                            name={'email'}
                            placeholder="Логин"
                            onChange={handleInputChange}
                            isIcon={true}
                            disabled={!isEditing}
                        />
                        <PasswordInput
                            value={''}
                            placeholder={'Пароль'}
                            name={'password'}
                            errorText={'Ошибка'}
                            disabled={true}
                        />
                    </div>
                )}
                {location.pathname === '/profile/orders' && (
                    <div className={styles.orders}>
                        <h2 className="text text_type_main-medium">История заказов</h2>
                    </div>
                )}
            </section>
            {location.pathname === '/profile' && (
                <>
                    {isEditing ? (
                        <div className={styles.buttons}>
                            <Button htmlType="submit" type="primary" size="medium" onClick={handleSave}>
                                Сохранить
                            </Button>
                            <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
                                Отменить
                            </Button>
                        </div>
                    ) : (
                        <Button htmlType="button" type="primary" size="medium" onClick={handleEdit}>
                            Редактировать
                        </Button>
                    )}
                    <p className={`${styles.textProfile} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </>
            )}
        </section>
    );
};

export default Profile;
