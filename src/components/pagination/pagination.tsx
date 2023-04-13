import { Button } from '@/components/button';

import styles from './pagination.module.scss';

export interface PaginationPropsType {
  prev: () => void;
  next: () => void;
  page: number;
  disabledNext: boolean;
}

export function Pagination({ prev, next, page, disabledNext }: PaginationPropsType) {
  return(
    <div
      className={styles.pagination}
      data-cypress='pagination'
      data-testid='pagination'
    >
      <Button
        onClick={prev}
        disabled={page === 1}
        >
        Prev
      </Button>
      <div
        className={styles.pagination__current}
        data-cypress='pagination-current'
        data-testid='pagination-current'
      >
        {page}
      </div>
      <Button
        disabled={disabledNext}
        onClick={next}
        >
        Next
      </Button>
    </div>
  )
}
