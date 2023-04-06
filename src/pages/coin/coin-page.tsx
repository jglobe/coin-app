import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { Diagram } from '@/components/diagram';
import { HistoryType } from '@/components/diagram/diagram';
import { FormBuy } from '@/components/form-buy';
import { SingleCoin } from '@/components/single-coin';
import { Loader } from '@/components/loader';

import * as coincapServices from '@/services/coincap.service';
import { PortfolioContext } from '@/contexts/portfolio.context';

import styles from './coin-page.module.scss';

export function CoinPage() {
  const context = useContext(PortfolioContext);

  const intervals = ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1'];

  const emptyCoinData = {} as coincapServices.CoinPropsType;
  const [coin, setCoin] = useState(emptyCoinData);
  const [pending, setPending] = useState(false);
  const [dateInterval, setDateInterval] = useState('d1');
  const [history, setHistory] = useState<HistoryType[]>([]);

  let { id } = useParams();

  useEffect(() => {
    async function getCoinById(id:string) {
      try {
        setPending(true);
        const currentCoin = await coincapServices.getCoin(id);

        setCoin(currentCoin);
      } catch(error) {
        console.error(error)
      } finally {
        setPending(false);
      }
    }

    if(id) getCoinById(id);
  }, [id]);

  useEffect(() => {
    async function getHistory(currentId:string, interval:string) {
      try {
        const currentHistory = await coincapServices.getHistoryById(currentId, interval);

        setHistory(currentHistory.data)
      } catch(error) {
        console.error(error);
      }
    }

    id && getHistory(id, dateInterval)
  }, [dateInterval]);

  function buyCoin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget

    const data = new FormData(event.currentTarget);
    const count = data.get('count');

    coin.data.id && count && context.addTransaction({ current: coin.data, count: +count });
    form.reset();
  }
  const navigate = useNavigate();

  return(
    <>
      {pending && <Loader />}
      {!pending && (
        <>
          <div className={styles.page}>
            {coin?.data && (
              <Fragment>
                <h2 className={styles.page__title}>{coin.data.name}</h2>
                <div className={styles.page__diagram}>
                  {history && (
                    <Diagram
                      dateInterval={dateInterval}
                      setDateInterval={setDateInterval}
                      history={history}
                      intervals={intervals}
                    />
                  )}
                </div>
                <FormBuy
                  onSubmit={buyCoin}
                />
                <SingleCoin
                  coin={coin.data}
                />
              </Fragment>
            )}
            {!coin?.data && (
              <div>
                Is something wrong! Get back.
              </div>
            )}
          </div>
          <Button
            onClick={() => navigate(-1)}
            className={styles.backButton}
          >
            Back
          </ Button>
        </>
      )}
    </>
  )
}
