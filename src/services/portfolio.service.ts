import * as coincapServices from '@/services/coincap.service';

export function getPortfolio() {
  return JSON.parse(localStorage.getItem('portfolio')||'[]');
}

export function addCoin(coin:coincapServices.CoinTypeRaw, count:number) {
  const portfolio = getPortfolio();
  const currentIndex = portfolio.findIndex((item: PortfolioItemPropsType) => item.id === coin.id);

  const transaction = {
    transactionId: Math.floor(Math.random() * 1000000),
    count,
    current:coin
  }

  if(currentIndex >= 0) {
    portfolio[currentIndex].data.push(transaction)
  } else {
    portfolio.push({ id: coin.id, name: coin.name, data: [transaction]})
  }
  localStorage.setItem('portfolio', JSON.stringify(portfolio));

  return transaction;
}

export function removeCoin(id:string, transactionId: number) {
  const portfolio = getPortfolio();
  const currentCoinIndex= portfolio.findIndex((item: PortfolioItemPropsType) => item.id === id);

  if(currentCoinIndex >= 0) {
    const transactionIndex = portfolio[currentCoinIndex].data.findIndex((item:{ transactionId: number }) => item.transactionId = transactionId)

    if(transactionIndex>= 0) {
      portfolio[currentCoinIndex].data.splice(transactionIndex, 1);
    }

    if(portfolio[currentCoinIndex].data.length === 0) {
       portfolio.splice(currentCoinIndex, 1);
    }
  }
  localStorage.setItem('portfolio', JSON.stringify(portfolio));
}

interface PortfolioItemPropsType {
  id: string;
  name: string;
  data: TransactionType[]
}

interface CalculatedPortfolioType {
  priceUsd: string;
  priceProfit: string;
  change:string;
  data:CalculatedPortfolioItemType[];
}

interface CalculatedPortfolioItemType {
  id:string;
  count: string;
  priceUsd: string;
  priceProfit: string;
  change:string;
}

interface TransactionType {
  count: number;
  transactionId?: number;
  current: coincapServices.CoinTypeRaw;
}

export type { PortfolioItemPropsType, CalculatedPortfolioType, CalculatedPortfolioItemType,TransactionType }
