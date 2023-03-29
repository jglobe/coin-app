import { Button } from '@/components/button';
import { Input } from '@/components/input';

import styles from './coin-page.module.scss';

export function CoinPage() {
  return(
    <div className={styles.page}>
      <h2 className={styles.page__title}>Bitcoin</h2>
      <div className={styles.page__diagram}>
        daigram
      </div>
      <div className={styles.coin}>
        <div className={styles.coin__prop}>
          Name:
          <span className={styles.coin__value}>
            Bitcoin
          </span>
        </div>
        <div className={styles.coin__prop}>
          Symbol:
          <span className={styles.coin__value}>
            BTC
          </span>
        </div>
        <div className={styles.coin__prop}>
          Market Cap:
          <span className={styles.coin__value}>
            2131
          </span>
        </div>
        <div className={styles.coin__prop}>
          VWAP (24Hr):
          <span className={styles.coin__value}>
            32135
          </span>
        </div>
        <div className={styles.coin__prop}>
          Supply:
          <span className={styles.coin__value}>
            321351
          </span>
        </div>
        <div className={styles.coin__prop}>
          Volume (24Hr):
          <span className={styles.coin__value}>
            3543513
          </span>
        </div>
        <div className={styles.coin__prop}>
          Change (24Hr):
          <span className={styles.coin__value}>
            351351351
          </span>
        </div>

        <form className={styles.form}>
          <Input
            type="number"
            placeholder='type...'
          />
          <Button
            type='submit'
          >
            Buy
          </Button>
        </form>
      </div>
    </div>
  )
}
