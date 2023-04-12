/// <reference types="jest" />
import { describe, expect, it, afterEach, vi } from 'vitest';

import { getPortfolio, PortfolioItemPropsType, TransactionType, addCoin, removeCoin } from '@/services/portfolio.service';

describe('Portfolio actions', () => {
  const mockTransactionId = 337333;

  const mockCoinSaved:TransactionType = {
    "transactionId":mockTransactionId,
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

  const mockPortfolio: PortfolioItemPropsType[] = [
    {"id":"bitcoin","name":"Bitcoin","data":[mockCoinSaved]}
  ];

  afterEach(() => {
    localStorage.clear()
  })

  describe('Get portfolio', () => {
    it('Empty', () => {
      const portfolio = getPortfolio()

      expect(portfolio).toEqual([])
    })
    it('Not empty', () => {
      localStorage.setItem('portfolio', JSON.stringify(mockPortfolio))
      const portfolio = getPortfolio()

      expect(portfolio).toEqual(mockPortfolio)
    })
  })

  it('Add coin', () => {
    vi.spyOn(global.Math, 'floor').mockReturnValue(mockTransactionId)
    const add = addCoin(mockCoinSaved.current, 1)
    const portfolio = getPortfolio()

    expect(add).toEqual(mockCoinSaved)
    expect(portfolio).toEqual(mockPortfolio)
  })
  it('Remove coin', () => {
    localStorage.setItem('portfolio', JSON.stringify(mockPortfolio))
    removeCoin('bitcoin', mockTransactionId)
    const portfolio = getPortfolio()

    expect(portfolio).toEqual([])
  })
})
