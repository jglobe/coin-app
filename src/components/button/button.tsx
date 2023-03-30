import styles from './button.module.scss';

interface ButtonPropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button({...props}:ButtonPropsType) {
  return(
    <button
      {...props}
      className={styles.button}
    />
  )
}
