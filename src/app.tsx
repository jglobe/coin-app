import { Header } from '@/components/header';
import { MainPage } from '@/pages/main';

import styles from '@/app.module.scss';

function App() {

  return (
    <div className={styles.app}>
      <Header />
      <MainPage />
    </div>
  )
}

export { App }
