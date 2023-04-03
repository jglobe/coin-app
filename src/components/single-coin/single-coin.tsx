import classNames from 'classnames';

import { formatPercent, formatCurrency } from '@/helpers/number';
import * as coincapServices from '@/services/coincap.service';

import styles from './single-coin.module.scss';

interface SingleCoinPropsType {
  coin: coincapServices.CoinTypeRaw ;
}

export function SingleCoin({ coin }: SingleCoinPropsType) {
  return(
    <div className={styles.coin}>
      <div className={styles.coin__prop}>
        Name:
        <span className={styles.coin__value}>
          {coin.name}
        </span>
      </div>
      <div className={styles.coin__prop}>
        Symbol:
        <span className={styles.coin__value}>
          {coin.symbol}
        </span>
      </div>
      <div className={styles.coin__prop}>
        Market Cap:
        <span className={styles.coin__value}>
          {formatCurrency(coin.marketCapUsd, '$')}
        </span>
      </div>
      <div className={styles.coin__prop}>
        VWAP (24Hr):
        <span className={styles.coin__value}>
          {formatCurrency(coin.vwap24Hr, '$')}
        </span>
      </div>
      <div className={styles.coin__prop}>
        Supply:
        <span className={styles.coin__value}>
          {formatCurrency(coin.supply, '')}
        </span>
      </div>
      <div className={styles.coin__prop}>
        Volume (24Hr):
        <span className={styles.coin__value}>
          {formatCurrency(coin.volumeUsd24Hr, '$')}
        </span>
      </div>
      <div className={styles.coin__prop}>
        Change (24Hr):
        <span className={classNames({
          [styles.coin__value]: true,
          [styles.coin__value_positive]: +coin.changePercent24Hr > 0,
          [styles.coin__value_negative]: +coin.changePercent24Hr < 0
        })}>
          {formatPercent(coin.changePercent24Hr)}
        </span>
      </div>
    </div>
  )
}
