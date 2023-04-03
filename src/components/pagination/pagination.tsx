import { Button } from '@/components/button';

import styles from './pagination.module.scss';

interface PaginationPropsType {
  prev: () => void;
  next: () => void;
  page: number;
  length: number;
}

export function Pagination({ prev, next, page, length }: PaginationPropsType) {
  return(
    <>
      {(length || length > 0) && (
        <div className={styles.pagination}>
          <Button
            onClick={prev}
            disabled={page === 1}
            >
            Prev
          </Button>
          <div className={styles.pagination__current}>
            {page}
          </div>
          <Button
            disabled={length < 10}
            onClick={next}
            >
            Next
          </Button>
        </div>
      )}
    </>
  )
}
