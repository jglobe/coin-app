import { useEffect, useState } from 'react';

import { Modal } from '@/components/modal';

import { formatPercent, formatCurrency } from '@/helpers/number';
import * as coincapServices from '@/services/coincap.service';

import styles from './header.module.scss';

export function Header() {
  const emptyCoinData:coincapServices.CoinsListPropsType = {
    data: [],
    timestamp: 0
  };

  const [topThree, setTopThree] = useState(emptyCoinData);
  const [portfolio, setPortfolio] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getTopThreeCoins() {
      try {
        const topTreeCoins = await coincapServices.getTreeTopCoins();

        setTopThree(topTreeCoins)
      } catch(error) {
        console.error(error)
      }
    }

    getTopThreeCoins();
  });

  function openPortfolioModal() {
    setIsModalOpen(true);
  }

  function closePortfolioModal(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsModalOpen(false);
  }

  return(
    <header className={styles.header}>
      <div className={styles.popular}>
        <p className={styles.popular__title}>
          Popular coins:
        </p>
        {topThree?.data.length && topThree.data.map((top:coincapServices.CoinTypeRaw) => (
          <div key={top.id} className={styles.popularCoin}>
            {top.symbol}:&nbsp;
            <span className={styles.popularCoin__price}>
              {formatCurrency(top.priceUsd, '$')}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.portfolio}>
        <p className={styles.portfolio__title}>
          Your portfolio price:
        </p>
        <button
          type='button'
          onClick={() => openPortfolioModal()}
          className={styles.portfolio__button}
        >
          134,32 USD +2,38 (1,80 %)
        </button>
      </div>
      {isModalOpen && (
        <Modal
          close={closePortfolioModal}
          title='Portfolio'
        >
          {!portfolio && (
            <div>Empty! Buy some coins...</div>
          )}
        </Modal>
      )}
    </header>
  )
}
