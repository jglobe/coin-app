import classNames from 'classnames';
import styles from './button.module.scss';

interface ButtonPropsType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button(props:ButtonPropsType) {
  return(
    <button
      {...props}
      data-cypress='button'
      className={classNames(styles.button, props.className)}
    />
  )
}
