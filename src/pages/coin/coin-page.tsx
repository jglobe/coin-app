import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import { Diagram } from '@/components/diagram';
import { FormBuy } from '@/components/form-buy';
import { SingleCoin } from '@/components/single-coin';

import * as coincapServices from '@/services/coincap.service';
import { PortfolioContext } from '@/contexts/portfolio.context';

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
  const navigate = useNavigate();

  return(
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
          </Fragment>
        )}
        <SingleCoin
          coin={coin.data ? coin.data : null}
        />
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
