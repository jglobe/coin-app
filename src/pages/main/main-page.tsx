import classNames from 'classnames';

import { Button } from '@/components/button';
import { Modal } from '@/components/modal';

import styles from './main-page.module.scss';
import { useState } from 'react';

export function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return(
      <div className={styles.list}>
        <div className={styles.list__body}>

          <div className={styles.listItem}>
            <a
              href='#'
              className={classNames(styles.listItem__link, styles.coin)}
            >
              <div className={classNames(styles.coin__symbol, styles.coin__prop) }>
                BTC
                <span className={classNames(styles.coin__value,  styles.coin__name)}>
                  Name
                </span>
              </div>

              <div className={classNames(styles.coin__price, styles.coin__prop) }>
                Price:
                <span className={ styles.coin__value}>
                  $21212
                </span>
              </div>

              <div className={classNames(styles.coin__cap, styles.coin__prop) }>
                Market Cap:
                <span className={ styles.coin__value}>
                  1234
                </span>
              </div>

              <div className={classNames(styles.coin__vwap, styles.coin__prop) }>
                VWAP (24Hr):
                <span className={ styles.coin__value}>
                  4545645
                </span>
              </div>

              <div className={classNames(styles.coin__supply, styles.coin__prop) }>
                Supply:
                <span className={ styles.coin__value}>
                  213154
                </span>
              </div>

              <div className={classNames(styles.coin__volume, styles.coin__prop) }>
                Volume (24Hr):
                <span className={ styles.coin__value}>
                  421212
                </span>
              </div>

              <div className={classNames(styles.coin__change, styles.coin__prop) }>
                Change (24Hr):
                <span className={ styles.coin__value}>
                  456456
                </span>
              </div>
            </a>
            <Button
              className={styles.coin__button}
              onClick={() => setIsModalOpen(true)}
            >
              +
            </Button>
          </div>

        </div>
        <div className={styles.pagination}>
          <Button
            disabled
          >
            Prev
          </Button>
          <div className={styles.pagination__current}>
            1
          </div>
          <Button>
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
