import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import classNames from 'classnames';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { ResizeObserver } from '@juggle/resize-observer';

import { formatXAxisDate } from '@/helpers/number'

import styles from './diagram.module.scss';

export interface HistoryType {
  priceUsd: string;
  time: number;
  date: string;
}

interface DiagramPropsType {
  history: HistoryType[];
  setDateInterval: Dispatch<SetStateAction<string>>;
  dateInterval: string;
  intervals: string[];
}

export function Diagram({ history, dateInterval, setDateInterval, intervals }:DiagramPropsType) {
  const [size, setSize] = useState({height: 200, width: 300});

  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = elementRef?.current;

    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];

        if(width > 502) {
          setSize({ height: 300, width })
        } else {
          setSize({ height: 180, width })
        }
      });
    });

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [])

  return(
      <div
        className={styles.diagram}
        ref={elementRef}
        data-cypress='diagram'
        data-testid='diagram'
      >
      {history?.length > 0 && (
        <>
          {size.width && (
            <LineChart
              width={size.width}
              height={size.height}
              data={history}
              margin={{ left: 10 }}
            >
              <Line
                stroke='#77ec81'
                activeDot={false}
                type="monotone"
                dataKey="priceUsd"
                />
              <XAxis
                tick={size.width < 550 ? false: true}
                dataKey='date'
                tickFormatter={formatXAxisDate}
                interval={size.width > 720 ? Math.floor(history.length/4) : Math.floor(history.length/2) }
                tickCount={2}
              />
              <YAxis />
            </LineChart>
          )}
          <div className={styles.group}>
            {intervals.length > 1 && intervals.map((item, index)=> (
              <label
                key={item}
                data-cypress='interval'
                data-testid='interval'
                className={classNames({
                  [styles.group__label]: true,
                  [styles.group__label_active]: dateInterval === item,
                })}
              >
                <input
                  type="radio"
                  name='interval'
                  value={item}
                  checked={dateInterval === item}
                  onChange={() => setDateInterval(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </>
      )}
      {history?.length === 0 && (
        <div
          data-cypress='warning'
          data-testid='warning'
          className={styles.warning}
        >
          No data
        </div>
      )}
  </div>
  )
}
