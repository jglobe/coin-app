import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import classNames from 'classnames';

import { Button } from '@/components/button';
import { Input } from '@/components/input';

import { formatPercent, formatCurrency } from '@/helpers/number';
import * as coincapServices from '@/services/coincap.service';
import * as portfolioService from '@/services/portfolio.service';

import styles from './coin-page.module.scss';
import { Diagram } from '@/components/diagram';

export function CoinPage() {
  const emptyCoinData = {} as coincapServices.CoinPropsType;
  const [coin, setCoin] = useState(emptyCoinData);

  let { id } = useParams();

  useEffect(() => {
    async function getCoinById(id:string) {
      try {
        const currentCoin = await coincapServices.getCoin(id);

        setCoin(currentCoin);
      } catch(error) {
        console.error(error)
      }
    }

    if(id) getCoinById(id);

  }, [id])

  function buyCoin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget

    const data = new FormData(event.currentTarget);
    const count = data.get('count');

    coin.data.id && count && portfolioService.addCoin(coin.data, +count);
    form.reset();
  }

  return(
    <div className={styles.page}>
      {coin?.data && (
        <Fragment>
          <h2 className={styles.page__title}>{coin.data.name}</h2>
          <div className={styles.page__diagram}>
            <Diagram id={coin.data.id} />
          </div>
          <div className={styles.coin}>
            <div className={styles.coin__prop}>
              Name:
              <span className={styles.coin__value}>
                {coin.data.name}
              </span>
            </div>
            <div className={styles.coin__prop}>
              Symbol:
              <span className={styles.coin__value}>
                {coin.data.symbol}
              </span>
            </div>
            <div className={styles.coin__prop}>
              Market Cap:
              <span className={styles.coin__value}>
                {formatCurrency(coin.data.marketCapUsd, '$')}
              </span>
            </div>
            <div className={styles.coin__prop}>
              VWAP (24Hr):
              <span className={styles.coin__value}>
                {formatCurrency(coin.data.vwap24Hr, '$')}
              </span>
            </div>
            <div className={styles.coin__prop}>
              Supply:
              <span className={styles.coin__value}>
                {formatCurrency(coin.data.supply, '')}
              </span>
            </div>
            <div className={styles.coin__prop}>
              Volume (24Hr):
              <span className={styles.coin__value}>
                {formatCurrency(coin.data.volumeUsd24Hr, '$')}
              </span>
            </div>
            <div className={styles.coin__prop}>
              Change (24Hr):
              <span className={classNames({
                [styles.coin__value]: true,
                [styles.coin__value_positive]: +coin.data.changePercent24Hr > 0,
                [styles.coin__value_negative]: +coin.data.changePercent24Hr < 0
              })}>
                {formatPercent(coin.data.changePercent24Hr)}
              </span>
            </div>

            <form
              onSubmit={buyCoin}
              className={styles.form}
            >
              <Input
                type="number"
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
          </div>
        </Fragment>
      )}
    </div>
  )
}
