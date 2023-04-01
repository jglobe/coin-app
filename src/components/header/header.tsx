import { useEffect, useState } from 'react';

import { Modal } from '@/components/modal';
import { Button } from '@/components/button';

import { formatPercent, formatCurrency, calculatePortfolio } from '@/helpers/number';
import * as coincapServices from '@/services/coincap.service';
import * as portfolioService from '@/services/portfolio.service';

import styles from './header.module.scss';
import classNames from 'classnames';

export function Header() {
  const emptyCoinData:coincapServices.CoinsListPropsType = {
    data: [],
    timestamp: 0
  };
  const emptyPortfolio:portfolioService.PortfolioItemPropsType[] = [];
  const emptyCalculatedPortfolio:portfolioService.CalculatedPortfolioType = {
    priceUsd: '0',
    priceProfit: '0',
    change: '0',
    data: []
  }

  const [topThree, setTopThree] = useState(emptyCoinData);
  const [portfolio, setPortfolio] = useState(emptyPortfolio);
  const [calculatedPortfolio, setCalculatedPortfolio] = useState(emptyCalculatedPortfolio);
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
  },[]);

  useEffect(() => {
    updatePortfolio();
  },[isModalOpen])

  function openPortfolioModal() {
    setIsModalOpen(true);
  }

  function closePortfolioModal(event:React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsModalOpen(false);
  }

  async function updatePortfolio() {
    const currentPortfolio = portfolioService.getPortfolio();
    setPortfolio(currentPortfolio);
    const currentCalculatedPortfolio = await calculatePortfolio(currentPortfolio);
    setCalculatedPortfolio(currentCalculatedPortfolio);
  }

  function removeTransaction(id:string, transactionId:number) {
    portfolioService.removeCoin(id, transactionId);
    updatePortfolio();
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
        {calculatedPortfolio && (
          <button
            type='button'
            onClick={() => openPortfolioModal()}
            className={styles.portfolio__button}
          >
            {`${formatCurrency(calculatedPortfolio.priceUsd, '$')}`}
            <span className={classNames({
              [styles.portfolio__button_positive]: +calculatedPortfolio.priceProfit > 0,
              [styles.portfolio__button_negative]: +calculatedPortfolio.priceProfit < 0
            })}>
              {` ${formatCurrency(calculatedPortfolio.priceProfit, '')}`}
            </span>
            <span className={classNames({
              [styles.portfolio__button_positive]: +calculatedPortfolio.change > 0,
              [styles.portfolio__button_negative]: +calculatedPortfolio.change < 0
            })}>
              {` (${formatPercent(calculatedPortfolio.change)})`}
            </span>
          </button>
        )}
      </div>
      {isModalOpen && (
        <Modal
          close={closePortfolioModal}
          title='Portfolio'
        >
          <div className={styles.modalPortfolio}>
            {!portfolio.length && (
              <div>Empty! Buy some coins...</div>
              )}
            {portfolio.length > 0 && portfolio.map((coin) => (
              <div key={coin.id}>
                <p className={styles.modalPortfolio__name}>
                  {coin.name}
                </p>
                <ul className={styles.modalPortfolio__transactions}>
                  {coin.data.length > 0 && coin.data.map((transaction) => (
                    <li
                      key={transaction.transactionId}
                      className={styles.transaction}
                    >
                      <div className={styles.transaction__data}>
                        <div className={styles.transaction__prop}>
                          Count:
                          <span className={styles.transaction__value}>
                            {transaction.count}
                          </span>
                        </div>
                        <div className={styles.transaction__prop}>
                          At price:
                          <span className={styles.transaction__value}>
                            {formatCurrency(transaction.current.priceUsd, '$')}
                          </span>
                        </div>
                      </div>
                      <Button
                        type='button'
                        onClick={() => removeTransaction(coin.id, transaction.transactionId)}
                      >
                        -
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </header>
  )
}
