
import { useCallback, useEffect, useState } from 'react';

import * as portfolioService from '@/services/portfolio.service';
import { PortfolioContext } from '@/context';
import { calculatePortfolio } from '@/helpers/number';

interface ProviderType {
  children: React.ReactNode;
}

export function PortfolioContextProvider(props: ProviderType) {
  const emptyCalculatedPortfolio:portfolioService.CalculatedPortfolioType = {
    priceUsd: '0',
    priceProfit: '0',
    change: '0',
    data: []
  }
  const [portfolio, setPortfolio] = useState<portfolioService.PortfolioItemPropsType[]>([]);
  const [calculated, setCalculated] = useState(emptyCalculatedPortfolio);

  const addTransaction = useCallback(async ( transaction: portfolioService.TransactionType ) => {
    const createdTransaction = await portfolioService.addCoin(transaction.current, transaction.count);

    setPortfolio((portfolio) => {
      const existedCoin = portfolio.some((coin) => coin.id === createdTransaction.current.id);

      if (existedCoin) {
        const updatedPortfolio = portfolio.map((coin) => {
          if (coin.id === createdTransaction.current.id) {
            return  { ...coin, data:[...coin.data, createdTransaction] };
          } else {
            return coin;
          }
        })

        return updatedPortfolio;
      } else {
        return [
          ...portfolio,
          {
            id: createdTransaction.current.id,
            name: createdTransaction.current.name,
            data: [createdTransaction]
          }
        ];
      }
    });
    const currentPortfolio = portfolioService.getPortfolio();
    setCalculated(await calculatedPortfolio(currentPortfolio));
  }, []);

  const removeTransaction = useCallback(async (coinId: string, transactionId: number) => {
    portfolioService.removeCoin(coinId, transactionId);

    setPortfolio((portfolio) => {
      const updatedPortfolio = portfolio
        .map((coin) => {
          if (coin.id === coinId) {
            const data = coin.data.filter((transaction) => transaction.transactionId !== transactionId);
            return  { ...coin, data };
          } else {
            return coin;
          }
        })
        .filter((coin) => coin.data.length > 0);

      return updatedPortfolio;
    });

    const currentPortfolio = portfolioService.getPortfolio();
    setCalculated(await calculatedPortfolio(currentPortfolio));
  }, []);

  async function calculatedPortfolio(current:portfolioService.PortfolioItemPropsType[]) {
    return await calculatePortfolio(current);
  }

  useEffect(() => {
    async function startPortfolio() {
       const currentPortfolio = portfolioService.getPortfolio();
      setPortfolio(currentPortfolio);
      setCalculated(await calculatedPortfolio(currentPortfolio));
    }

    startPortfolio();
  }, []);

  return(
    <PortfolioContext.Provider value={{ portfolio, calculated, addTransaction, removeTransaction }}>
      {props.children}
    </PortfolioContext.Provider>
  )
}
