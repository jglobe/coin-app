import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { Diagram } from '@/components/diagram';
import { FormBuy } from '@/components/form-buy';
import { SingleCoin } from '@/components/single-coin';
import { Loader } from '@/components/loader';

import * as coincapServices from '@/services/coincap.service';
import { PortfolioContext } from '@/contexts/portfolio.context';

import styles from './coin-page.module.scss';

export function CoinPage() {
  const context = useContext(PortfolioContext);

  const emptyCoinData = {} as coincapServices.CoinPropsType;
  const [coin, setCoin] = useState(emptyCoinData);
  const [pending, setPending] = useState(false);

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
                  <Diagram id={coin.data.id} />
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
