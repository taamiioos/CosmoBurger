import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from '../modal/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('modal-root');

const Modal = ({children, onClose, title}) => {
    useEffect(() => {
        const handleClose = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleClose);

        return () => {
            document.removeEventListener('keydown', handleClose);
        };
    }, [onClose]);

    return ReactDOM.createPortal((<>
        <ModalOverlay onClose={onClose}/>
        <div className={styles.modal}>
            <div className={styles.modalHeader}>
                <h2 className="text text_type_main-large">{title}</h2>
                <div onClick={onClose}>
                    <CloseIcon type="primary"/>
                </div>
            </div>
            {children}
        </div>
    </>), modalRoot);
};

Modal.propTypes = {
    children: PropTypes.node.isRequired, onClose: PropTypes.func.isRequired, title: PropTypes.string,
};

export default Modal;
