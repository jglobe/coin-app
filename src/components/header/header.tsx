import { useContext, useState } from 'react';
import classNames from 'classnames';

import { Modal } from '@/components/modal';
import { Button } from '@/components/button';

import { formatPercent, formatCurrency } from '@/helpers/number';
import * as coincapServices from '@/services/coincap.service';
import { PortfolioContext } from '@/contexts/portfolio.context';
import { PopularCoinsContext } from '@/contexts/popular-coins.context';

import styles from './header.module.scss';

export function Header() {
  const context = useContext(PortfolioContext);
  const popular = useContext(PopularCoinsContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openPortfolioModal() {
    setIsModalOpen(true);
  }

  function closePortfolioModal() {
    setIsModalOpen(false);
  }

  return(
    <header
      data-cypress='header'
      className={styles.header}
    >
      <div className={styles.popular}>
        <p className={styles.popular__title}>
          Popular coins:
        </p>
        {popular.popular?.length && popular.popular.map((top:coincapServices.CoinTypeRaw) => (
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
        {context.calculated && (
          <button
            type='button'
            data-cypress='portfolio-button'
            onClick={() => openPortfolioModal()}
            className={styles.portfolio__button}
          >
            {`${formatCurrency(context.calculated.priceUsd, '$')}`}
            <span className={classNames({
              [styles.portfolio__button_positive]: +context.calculated.priceProfit > 0,
              [styles.portfolio__button_negative]: +context.calculated.priceProfit < 0
            })}>
              {` ${formatCurrency(context.calculated.priceProfit, '')}`}
            </span>
            <span className={classNames({
              [styles.portfolio__button_positive]: +context.calculated.change > 0,
              [styles.portfolio__button_negative]: +context.calculated.change < 0
            })}>
              {` (${formatPercent(context.calculated.change)})`}
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
            {!context.portfolio.length && (
              <div data-cypress='warning'>Empty! Buy some coins...</div>
            )}
            {context.portfolio.length > 0 && context.portfolio.map((coin) => (
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
                        onClick={() => transaction.transactionId && context.removeTransaction(coin.id, transaction.transactionId)}
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
