import * as coincapServices from '@/services/coincap.service';

export function getPortfolio() {
  return JSON.parse(localStorage.getItem('portfolio')||'[]');
}

export function addCoin(coin:coincapServices.CoinTypeRaw, count:number) {
  const portfolio = getPortfolio();
  const currentIndex = portfolio.findIndex((item: PortfolioItemPropsType) => item.id === coin.id);

  const transactionId = Math.floor(Math.random() * 1000000);

  if(currentIndex >= 0) {
    portfolio[currentIndex].data.push({ count, transactionId, current:coin })
  } else {
    portfolio.push({ id: coin.id, name: coin.name, data: [{ count, transactionId, current:coin }]})
  }
  localStorage.setItem('portfolio', JSON.stringify(portfolio));
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
  data: {
    count: number;
    transactionId: number;
    current:coincapServices.CoinTypeRaw;
  }[]
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

export type { PortfolioItemPropsType, CalculatedPortfolioType, CalculatedPortfolioItemType }
