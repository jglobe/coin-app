import styles from './input.module.scss';

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
}

export function Input({...props}:InputPropsType) {
  return(
    <input
      {...props}
      className={styles.input}
    />
  )
}
