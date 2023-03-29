
import styles from './header.module.scss';

export function Header() {
  return(
    <header className={styles.header}>
      <div className={styles.popular}>
        <p className={styles.popular__title}>
          Popular coins:
        </p>
        <div className={styles.popularCoin}>
            BTC: <span className={styles.popularCoin__price}>$1000</span>
        </div>
        <div className={styles.popularCoin}>
            BTC: <span className={styles.popularCoin__price}>$1000</span>
        </div>
        <div className={styles.popularCoin}>
            BTC: <span className={styles.popularCoin__price}>$1000</span>
        </div>
      </div>
      <div className={styles.portfolio}>
        <p className={styles.portfolio__title}>
          Your portfolio price:
        </p>
        <button
          type='button'
          onClick={() => {}}
          className={styles.portfolio__button}
        >
          134,32 USD +2,38 (1,80 %)
        </button>
      </div>
    </header>
  )
}
