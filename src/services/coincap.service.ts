import axios from 'axios';

const baseUrl = 'https://api.coincap.io/v2/assets';

export async function getCoin(id :string) {
  const result = await axios.get(`${baseUrl}/${id}`);
  return result.data
}

export async function getCoins(limit: number, offset:number) {
  const result = await axios.get(baseUrl, { params: { limit, offset } });
  return result.data
}

export async function getTreeTopCoins() {
  const result = await axios.get(baseUrl, { params: { limit:3 } });
  return result.data
}

interface CoinTypeRaw {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

interface CoinPropsType {
  data: CoinTypeRaw;
  timestamp: number;
}

interface CoinsListPropsType {
  data: CoinTypeRaw[];
  timestamp: number;
}

export type { CoinPropsType, CoinsListPropsType, CoinTypeRaw }
