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
        <div className={styles.modal}>
          <button
            type='button'
            onClick={() => close()}
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
