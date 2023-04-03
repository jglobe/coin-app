import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Button } from '@/components/button'
import { Modal } from '@/components/modal';
import { FormBuy } from '@/components/form-buy';

import * as coincapServices from '@/services/coincap.service';
import { formatCurrency, formatPercent } from '@/helpers/number';
import { PortfolioContext } from '@/contexts/portfolio.context';

import styles from './coins.module.scss';

interface CoinsType {
  coins: coincapServices.CoinTypeRaw[]|null;
}

export function Coins({ coins } :CoinsType) {
  const context = useContext(PortfolioContext);
  const emptyCoinData:coincapServices.CoinTypeRaw = {
    changePercent24Hr: '',
    explorer: '',
    id: '',
    marketCapUsd: '',
    maxSupply: '',
    name: '',
    priceUsd: '',
    rank: '',
    supply: '',
    symbol: '',
    volumeUsd24Hr: '',
    vwap24Hr: ''
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(emptyCoinData);

  function openBuyModal(coin:coincapServices.CoinTypeRaw) {
    setIsModalOpen(true);
    setSelectedCoin(coin);
  }

  function closeBuyModal() {
    setIsModalOpen(false);
  }

  function buyCoin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget

    const data = new FormData(event.currentTarget);
    const count = data.get('count');

    selectedCoin.id && count && context.addTransaction({ current: selectedCoin, count: +count });
    form.reset();
    setIsModalOpen(false);
  }

  return(
    <>
      {coins === null && (
        <div>
          Is something wrong!
        </div>
      )}
      {coins && coins.length > 0 && coins.map((coin) => (
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
            onClick={() => openBuyModal(coin)}
          >
            +
          </Button>
        </div>
      ))}
      {isModalOpen && (
        <Modal
          close={closeBuyModal}
          title='Buy'
        >
          {selectedCoin && (
            <Fragment>
              <div className={styles.modalField}>
                Buy <span className={styles.modalField__mark}>{selectedCoin.name}</span>
                at price: <span className={styles.modalField__mark}>{formatCurrency(selectedCoin.priceUsd, '$')}</span>
              </div>
              <FormBuy
                onSubmit={buyCoin}
              />
            </Fragment>
          )}
        </Modal>
      )}
    </>
  )
}
