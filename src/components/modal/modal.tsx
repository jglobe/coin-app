import styles from './modal.module.scss';

interface ModalPropsType {
  children: React.ReactNode;
  title?: string;
  close: (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function Modal({ children, title = '', close }:ModalPropsType) {
  return(
    <div className={styles.wrapper}>
      <div className={styles.wrapper__inner}>
        <div className={styles.modal}>
          <button
            type='button'
            onClick={(event) => close(event)}
            className={styles.modal__close}
          >
            +
          </button>
          {title && (
            <h3 className={styles.modal__title}>
              {title}
            </h3>
          )}
          <div className={styles.modal__content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
