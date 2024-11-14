import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from '../modal/modal-overlay';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {IModal} from './../types/components-types';

const modalRoot: HTMLElement | null = document.getElementById('modal-root');

const Modal: React.FC<IModal> = ({children, onClose, title}) => {
    useEffect(() => {
        const handleClose = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleClose);
        return () => {
            document.removeEventListener('keydown', handleClose);
        };
    }, [onClose]);

    if (!modalRoot) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose} data-testid="modal-overlay"/>
            <div
                className={styles.modal}
                onClick={handleOverlayClick}
                data-testid="modal-container"
            >
                <div className={styles.modalHeader} data-testid="modal-header">
                    <h2 className="text text_type_main-large" data-testid="modal-title">{title}</h2>
                    <CloseIcon onClick={onClose} type="primary" data-testid="close-icon"/>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    );
};

export default Modal;
