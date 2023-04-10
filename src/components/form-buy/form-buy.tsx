import classNames from 'classnames';

import { Button } from '@/components/button'
import { Input } from '@/components/input';

import styles from './form-buy.module.scss';

interface FormBuyPropsType extends React.FormHTMLAttributes<HTMLFormElement> {
}

export function FormBuy(props: FormBuyPropsType) {
  return(
    <form
      {...props}
      data-cypress='form'
      onSubmit={props.onSubmit}
      className={classNames(styles.form, props.className)}
    >
      <Input
        className={styles.form__input}
        type='number'
        placeholder='0.000001'
        name='count'
        step={0.000001}
        min={0.000001}
        required
      />
      <Button
        type='submit'
      >
        Buy
      </Button>
    </form>
  )
}
