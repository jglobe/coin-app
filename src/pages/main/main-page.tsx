import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from '@/components/button';
import { Modal } from '@/components/modal';

import { formatPercent, formatCurrency } from '@/helpers/number';
import * as coincapServices from '@/services/coincap.service';

import styles from './main-page.module.scss';

export function MainPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  
  const emptyCoinData:coincapServices.CoinsListPropsType = {
    data: [],
    timestamp: 0
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coins, setCoins] = useState(emptyCoinData);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let currentPage = searchParams.get('page');
    if (currentPage === null|| isNaN(+currentPage)|| +currentPage <= 1) {
      searchParams.delete('page');
      setSearchParams(searchParams);
      currentPage = '1';
    }

    const coinsPerPage = 10;
    const coinsOffset = coinsPerPage * (+currentPage - 1);

    async function getCoinPerPage(perPage:number, offset:number) {
      try {
        const coinsList = await coincapServices.getCoins(perPage, offset);

        setCoins(coinsList);
      } catch(error) {
        console.error(error)
      }
    }

    getCoinPerPage(coinsPerPage, coinsOffset);
    setPage(+currentPage);
  }, [searchParams])

  return(
      <div className={styles.list}>
        <div className={styles.list__body}>
          {coins?.data.length > 0 && coins.data.map((coin:coincapServices.CoinTypeRaw) => (
            <div
              key={coin.id}
              className={styles.listItem}
            >
              <Link
                to={coin.id}
                className={classNames(styles.listItem__link, styles.coin)}
              >
                <div className={classNames(styles.coin__symbol, styles.coin__prop) }>
                  {coin.symbol}
                  <span className={classNames(styles.coin__value,  styles.coin__name)}>
                    {coin.name}
                  </span>
                </div>

                <div className={classNames(styles.coin__price, styles.coin__prop) }>
                  Price:
                  <span className={styles.coin__value}>
                    {formatCurrency(coin.priceUsd, '$')}
                  </span>
                </div>

                <div className={classNames(styles.coin__cap, styles.coin__prop) }>
                  Market Cap:
                  <span className={ styles.coin__value}>
                    {formatCurrency(coin.marketCapUsd, '$')}
                  </span>
                </div>

                <div className={classNames(styles.coin__vwap, styles.coin__prop) }>
                  VWAP (24Hr):
                  <span className={ styles.coin__value}>
                    {formatCurrency(coin.vwap24Hr, '$')}
                  </span>
                </div>

                <div className={classNames(styles.coin__supply, styles.coin__prop) }>
                  Supply:
                  <span className={ styles.coin__value}>
                    {formatCurrency(coin.supply, '')}
                  </span>
                </div>

                <div className={classNames(styles.coin__volume, styles.coin__prop) }>
                  Volume (24Hr):
                  <span className={ styles.coin__value}>
                    {formatCurrency(coin.volumeUsd24Hr, '$')}
                  </span>
                </div>

                <div className={classNames(styles.coin__change, styles.coin__prop) }>
                  Change (24Hr):
                  <span className={classNames({
                    [styles.coin__value]: true,
                    [styles.coin__value_positive]: +coin.changePercent24Hr > 0,
                    [styles.coin__value_negative]: +coin.changePercent24Hr < 0
                  })}>
                    {formatPercent(coin.changePercent24Hr)}
                  </span>
                </div>
              </Link>
              <Button
                className={styles.coin__button}
                onClick={() => setIsModalOpen(true)}
              >
                +
              </Button>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          <Button
            onClick={() => {
              searchParams.set('page', `${page - 1}`);
              setSearchParams(searchParams);
            }}
            disabled={page === 1}
          >
            Prev
          </Button>
          <div className={styles.pagination__current}>
            {page}
          </div>
          <Button
            disabled={coins && coins.data.length < 10}
            onClick={() => {
              searchParams.set('page', `${page + 1}`);
              setSearchParams(searchParams);
            }}
          >
            Next
          </Button>
        </div>
        {isModalOpen && (
          <Modal
            close={setIsModalOpen}
          >
            modal
          </Modal>
        )}

      </div>
  )
}
