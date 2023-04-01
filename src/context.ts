import React from "react";

import * as portfolioService from '@/services/portfolio.service';

interface ContextPortfolioType {
  portfolio: portfolioService.PortfolioItemPropsType[];
  calculated: portfolioService.CalculatedPortfolioType;
  addTransaction: (transaction: portfolioService.TransactionType) => void;
  removeTransaction: (coinId: string, transactionId: number) => void;
}


const emptyPortfolio: ContextPortfolioType = {
  portfolio: [],
  calculated: {
    priceUsd: '0',
    priceProfit: '0',
    change:'0',
    data: []
  },
  addTransaction: function (transaction: portfolioService.TransactionType): void {
    throw new Error("Function not implemented.");
  },
  removeTransaction: function (coinId: string, transactionId: number): void {
    throw new Error("Function not implemented.");
  }
}
const PortfolioContext = React.createContext(emptyPortfolio);

export { PortfolioContext }
