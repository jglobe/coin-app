import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Diagram } from '@/components/diagram';

import { formatPercent, formatCurrency } from '@/helpers/number';
import * as coincapServices from '@/services/coincap.service';
import { PortfolioContext } from '@/context';

import styles from './coin-page.module.scss';

export function CoinPage() {
  const context = useContext(PortfolioContext);

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
  }, [id]);

  function buyCoin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget

    const data = new FormData(event.currentTarget);
    const count = data.get('count');

    coin.data.id && count && context.addTransaction({ current: coin.data, count: +count });
    form.reset();
  }
  let navigate = useNavigate();

  return(
    <>
      <div className={styles.page}>
        {coin?.data && (
          <Fragment>
            <h2 className={styles.page__title}>{coin.data.name}</h2>
            <div className={styles.page__diagram}>
              <Diagram id={coin.data.id} />
            </div>
            <form
              onSubmit={buyCoin}
              className={styles.form}
            >
              <Input
                className={styles.form__input}
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
            </div>
          </Fragment>
        )}
      </div>
      <Button
        onClick={() => navigate(-1)}
        className={styles.backButton}
      >
          Back
      </ Button>
    </>
  )
}
