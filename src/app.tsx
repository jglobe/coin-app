import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Header } from '@/components/header';
import { MainPage } from '@/pages/main';
import { CoinPage } from '@/pages/coin';

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
    <div className={styles.app}>
      <Header />
      <RouterProvider router={router}/>
    </div>
  )
}

export { App }
