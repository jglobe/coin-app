import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { ResizeObserver } from '@juggle/resize-observer';

import * as coincapServices from '@/services/coincap.service';

import styles from './diagram.module.scss';

interface DiagramPropsType {
  id: string;
}

const intervals = ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1'];

export function Diagram({ id }:DiagramPropsType) {
  const [size, setSize] = useState({height: 200, width: 300});
  const [history, setHistory] = useState([]);
  const [dateInterval, setDateInterval] = useState('d1');

  useEffect(() => {
    async function getHistory(currentId:string, interval:string) {
      try {
        const currentHistory = await coincapServices.getHistoryById(currentId, interval);

        setHistory(currentHistory.data)
      } catch(error) {
        console.error(error);
      }
    }

    getHistory(id, dateInterval)
  }, [dateInterval]);

  const elementRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = elementRef?.current;

    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];

        if(width > 720) {
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

  const formatXAxis = (tickItem:string) => {
    const date = new Date(tickItem)
    return date.toLocaleDateString("en-US");
  }

  return(
      <div
        className={styles.diagram}
        ref={elementRef}
      >
      {history?.length > 0 && (
          <>
            {size.width && (
              <LineChart width={size.width} height={size.height} data={history}>
                <Line
                  stroke='#77ec81'
                  activeDot={false}
                  type="monotone"
                  dataKey="priceUsd"
                  />
                <XAxis
                  dataKey='date'
                  tickFormatter={formatXAxis}
                  interval={size.width > 720 ? Math.floor(history.length/4) : Math.floor(history.length/2) }
                />
                <YAxis />
              </LineChart>
            )}
            <div className={styles.group}>
              {intervals && intervals.map((item, index)=> (
                <label
                  key={item}
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
  </div>
  )
}
