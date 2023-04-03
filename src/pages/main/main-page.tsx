import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Coins } from '@/components/coins';
import { Pagination } from '@/components/pagination';
import { Button } from '@/components/button';
import { Loader } from '@/components/loader';

import * as coincapServices from '@/services/coincap.service';

import styles from './main-page.module.scss';

export function MainPage() {
  const emptyCoinsData:coincapServices.CoinsListPropsType = {
    data: [],
    timestamp: 0
  };
  const [coins, setCoins] = useState(emptyCoinsData);
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();

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
        setPending(true);
        const coinsList = await coincapServices.getCoins(perPage, offset);

        setCoins(coinsList);
      } catch(error) {
        console.error(error)
      } finally {
        setPending(false);
      }
    }

    getCoinPerPage(coinsPerPage, coinsOffset);
    setPage(+currentPage);
  }, [searchParams])

  const navigate = useNavigate();

  return(
      <div className={styles.list}>
        <div className={styles.list__body}>
          {pending && <Loader />}
          {!pending && (
            <Coins
              coins={coins.data ? coins.data : null}
            />
          )}
          {!pending && (!coins.data || coins.data.length === 0) && (
            <>
              <Button
                onClick={() => {
                  searchParams.set('page', `1`);
                  setSearchParams(searchParams);
                }}
                className={styles.backButton}
              >
                Go to the first page
              </ Button>
              <Button
                onClick={() => navigate(-1)}
                className={styles.backButton}
              >
                Go to the previous page
              </ Button>
            </>
          )}
        </div>
        {!pending && (
          <Pagination
            prev={() => {
              searchParams.set('page', `${page - 1}`);
              setSearchParams(searchParams);
            }}
            next={() => {
              searchParams.set('page', `${page + 1}`);
              setSearchParams(searchParams);
            }}
            page={page}
            length={coins.data.length}
          />
        )}
      </div>
  )
}
