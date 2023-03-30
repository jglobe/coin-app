import { Dispatch, SetStateAction } from 'react';

import styles from './modal.module.scss';

interface ModalPropsType {
  children: React.ReactNode;
  close: Dispatch<SetStateAction<boolean>>;
}


export function Modal({ children, close }:ModalPropsType) {
  return(
    <div className={styles.wrapper}>
      <div className={styles.wrapper__inner}>
        <div className={styles.modal}>
          <button
            type='button'
            onClick={() => close(false)}
            className={styles.modal__close}
          >
            +
          </button>
          {children}
        </div>
      </div>
    </div>
  )
}
