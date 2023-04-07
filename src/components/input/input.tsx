import classNames from 'classnames';

import styles from './input.module.scss';

interface InputPropsType extends React.InputHTMLAttributes<HTMLInputElement> {
}

export function Input(props:InputPropsType) {
  return(
    <input
      {...props}
      data-cypress='input'
      className={classNames(styles.input, props.className)}
    />
  )
}
