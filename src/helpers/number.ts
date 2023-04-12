import * as coincapServices from '@/services/coincap.service';
import * as portfolioService from '@/services/portfolio.service';

const trillion = 1000000000000;
const billion = 1000000000;
const million = 1000000;

export function formatCurrency(value:string|number|null, currency:string) {
  if(value === null || isNaN(+value)) return '-';
  if(+value > trillion) return currency+(+value/trillion).toFixed(2)+'t';
  if(+value > billion) return currency+(+value/billion).toFixed(2)+'b';
  if (+value > million) return currency+(+value/million).toFixed(2)+'m';
  if (+value < 1 && +value > -1) return currency+`${(+value).toPrecision(2)}`;

  return `${currency}${(+value).toFixed(2)}`;
}

export function formatPercent(value:string|number|null) {
  if(value === null || isNaN(+value)) return '0';
  if (+value < 1 && +value > -1) return `${(+value).toPrecision(2)}%`;

  return `${(+value).toFixed(2)}%`;
}

export async function calculatePortfolio(portfolio:portfolioService.PortfolioItemPropsType[]) {
  let result:portfolioService.CalculatedPortfolioType = {
    priceUsd: '0',
    priceProfit: '0',
    change: '0',
    data: []
  }

  if(portfolio.length > 0) {

    let calculated =  await Promise.all(portfolio.map( async(coin) => {
      let priceUsd = 0;
      let count = 0;
      let priceProfit = 0;
      let change = 0;
      const newestDataOfCoin = await coincapServices.getCoin(coin.id);

      coin.data.forEach((item) => {
        count += +item.count;
        priceUsd += +item.current.priceUsd * item.count;
        priceProfit += (+newestDataOfCoin.data.priceUsd - +item.current.priceUsd);
        change += (+newestDataOfCoin.data.changePercent24Hr - +item.current.changePercent24Hr);
      })

      return({
        id: coin.id,
        count: count.toString(),
        priceUsd: priceUsd.toString(),
        priceProfit: priceProfit.toString(),
        change: change.toString()
      })

    }));

    let priceUsd = 0;
    let priceProfit = 0;
    let change = 0;

    calculated.forEach((coin) => {
      priceUsd += +coin.priceUsd
      priceProfit += +coin.priceProfit
      change += +coin.change
    })

    result.priceUsd = priceUsd.toString();
    result.priceProfit = priceProfit.toString();
    result.change = (change/calculated.length).toString();
    result.data = [...calculated];
  }

  return result;
}
