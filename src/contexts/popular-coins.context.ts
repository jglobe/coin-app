import React from 'react';

import * as coincapServices from '@/services/coincap.service';

interface ContextPopularCoinsType {
  popular: coincapServices.CoinTypeRaw[];
}

const emptyPopular: ContextPopularCoinsType = {
  popular: []
};

const PopularCoinsContext = React.createContext(emptyPopular);

export { PopularCoinsContext }
