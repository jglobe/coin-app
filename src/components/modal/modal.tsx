import styles from './modal.module.scss';

export interface ModalPropsType {
  children: React.ReactNode;
  title?: string;
  close: () => void;
  style?: React.CSSProperties;
}

export function Modal({ children, title = '', close, style }:ModalPropsType) {
  return(
    <div
      className={styles.wrapper}
      style={style}
    >
      <div className={styles.wrapper__inner}>
        <div
          className={styles.modal}
          data-cypress='modal'
          data-testid='modal'
        >
          <button
            data-cypress='modal-close'
            data-testid='modal-close'
            type='button'
            onClick={() => close()}
            className={styles.modal__close}
          >
            +
          </button>
          {title && (
            <h3
              data-testid='modal-title'
              className={styles.modal__title}
            >
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
