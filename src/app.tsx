import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Header } from '@/components/header';
import { MainPage } from '@/pages/main';
import { CoinPage } from '@/pages/coin';

import { PortfolioContextProvider } from '@/providers/portfolio.provider';
import { PopularCoinsContextProvider } from '@/providers/popular-coins.provider';

import styles from '@/app.module.scss';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/:id",
        element: <CoinPage />,
      },
    ],
  },
]);

function App() {
  return (
    <PortfolioContextProvider>
      <div className={styles.app}>
        <PopularCoinsContextProvider>
          <Header />
        </PopularCoinsContextProvider>
        <RouterProvider router={router}/>
      </div>
    </PortfolioContextProvider>
  )
}

export { App }
