import { useEffect, useState } from 'react';

import * as coincapServices from '@/services/coincap.service';
import { PopularCoinsContext } from '@/contexts/popular-coins.context';

interface ProviderType {
  children: React.ReactNode;
}

export function PopularCoinsContextProvider(props: ProviderType) {
  const emptyCoinData:coincapServices.CoinTypeRaw[] = [];
  const [popular, setPopular] = useState(emptyCoinData);

  useEffect(() => {
    async function getTopThreeCoins() {
      try {
        const topThreeCoins = await coincapServices.getThreeTopCoins();

        setPopular(topThreeCoins.data);
      } catch(error) {
        console.error(error)
      }
    }

    getTopThreeCoins();
  },[]);

  return(
    <PopularCoinsContext.Provider value={{ popular }}>
      {props.children}
    </PopularCoinsContext.Provider>
  )
}
