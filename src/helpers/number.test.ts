import axios from 'axios'

import { formatCurrency, formatPercent, calculatePortfolio, formatXAxisDate } from './number';
import * as portfolioService from '@/services/portfolio.service';

jest.mock('axios');

describe('Numbers', () => {
  describe('Format currency', () => {
    it('Format number + $', () => {
      expect(formatCurrency(20.0001216515,'$')).toEqual('$20.00')
    });
    it('Format number + €', () => {
      expect(formatCurrency(555.555555,'€')).toEqual('€555.56')
    });
    it('Format million + $', () => {
      expect(formatCurrency(12345678.123456,'$')).toEqual('$12.35m')
    });
    it('Format billion + $', () => {
      expect(formatCurrency(12345678912.123456,'$')).toEqual('$12.35b')
    });
    it('Format trillion + $', () => {
      expect(formatCurrency(12345678912345.123456,'$')).toEqual('$12.35t')
    });
    it('Format number + "empty string"', () => {
      expect(formatCurrency(78.0090009,'')).toEqual('78.01')
    });
    it('Format zero + "empty string"', () => {
      expect(formatCurrency(0,'')).toEqual('0.0')
    });
    it('Format float + "empty string"', () => {
      expect(formatCurrency(0.23456,'')).toEqual('0.23')
    });
    it('null + "empty string"', () => {
      expect(formatCurrency(null,'')).toEqual('-')
    });
    it('Format negative + "empty string"', () => {
      expect(formatCurrency(-555.555555,'')).toEqual('-555.56')
    });
    it('Format string is a number + "empty string"', () => {
      expect(formatCurrency('555.555555','')).toEqual('555.56')
    });
    it('Format string is not a number + "empty string"', () => {
      expect(formatCurrency('string','')).toEqual('-')
    });
  });

  describe('Format percent', () => {
    it('null', () => {
      expect(formatPercent(null)).toEqual('0')
    })
    it('Format zero', () => {
      expect(formatPercent(0)).toEqual('0.0%')
    })
    it('Format float', () => {
      expect(formatPercent(5.5121314)).toEqual('5.51%')
    })
    it('Format long float < 1', () => {
      expect(formatPercent(0.00001131554)).toEqual('0.000011%')
    })
    it('Format negative', () => {
      expect(formatPercent(-5.456)).toEqual('-5.46%')
    })
    it('Format string is a number', () => {
      expect(formatPercent('12.8')).toEqual('12.80%')
    })
    it('Format string is not a number', () => {
      expect(formatPercent('string')).toEqual('0')
    })
  });

  describe('Calculate portfolio', () => {
    it('Nothing to calc', async () => {
      expect(await calculatePortfolio([])).toEqual({
        priceUsd: '0',
        priceProfit: '0',
        change: '0',
        data: []
      })
    })
    it('Some coin', async () => {
      const mockCoinFetched = {
        data: {
          "id":"bitcoin",
          "rank":"1",
          "symbol":"BTC",
          "name":"Bitcoin",
          "supply":"19344081.0000000000000000",
          "maxSupply":"21000000.0000000000000000",
          "marketCapUsd":"581658298398.4463182973927856",
          "volumeUsd24Hr":"5485243480.3038482491385684",
          "priceUsd":"30000",
          "changePercent24Hr":"-0.1208993552467776",
          "vwap24Hr":"29969.5376570425039245",
          "explorer":"https://blockchain.info/"
        }
      }

      const mockCoinSaved:portfolioService.TransactionType = {
        "transactionId":337333,
        "count":1,
        "current":{
          "id":"bitcoin",
          "rank":"1",
          "symbol":"BTC",
          "name":"Bitcoin",
          "supply":"19344081.0000000000000000",
          "maxSupply":"21000000.0000000000000000",
          "marketCapUsd":"581970140194.1246662633646607",
          "volumeUsd24Hr":"5491475441.4300574298718561",
          "priceUsd":"30100",
          "changePercent24Hr":"-0.0942612711534108",
          "vwap24Hr":"29969.5376570425039245",
          "explorer":"https://blockchain.info/"
        }
      }

      const mockPortfolio: portfolioService.PortfolioItemPropsType[] = [
        {"id":"bitcoin","name":"Bitcoin","data":[mockCoinSaved]}
      ];

      const calculatedPortfolio:portfolioService.CalculatedPortfolioType = {
        priceUsd: '30100',
        priceProfit: '-100',
        change: '-0.026638084093366793',
        data: [
          {
            change: '-0.026638084093366793',
            count: '1',
            id: 'bitcoin',
            priceProfit: '-100',
            priceUsd: '30100',
          },
        ]
      };

      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
        data: mockCoinFetched,
      })

      expect(await calculatePortfolio(mockPortfolio)).toEqual(calculatedPortfolio)
    })
  });

  describe('Foramt diagram X Axis date', () => {
    it('Date as prop', () => {
      expect(formatXAxisDate("2022-04-07T00:00:00.000Z")).toEqual('07.04.2022, 03:00:00')
    })
    it('Ivalid date as prop', () => {
      expect(formatXAxisDate('invalid')).toEqual('')
    })
  });
})
