
const trillion = 1000000000000;
const billion = 1000000000;
const million = 1000000;

export function formatCurrency(value:string|number, currency:string) {
  if(value === null) return '-';
  if(+value > trillion) return currency+(+value/trillion).toFixed(2)+'t';
  if(+value > billion) return currency+(+value/billion).toFixed(2)+'b';
  if (+value > million) return currency+(+value/million).toFixed(2)+'m';
  if (+value < 1 && +value > -1) return currency+`${(+value).toPrecision(2)}`;

  return `${currency}${(+value).toFixed(2)}`;
}

export function formatPercent(value:string|number) {
  if(value === null) return '0';
  if (+value < 1 && +value > -1) return `${(+value).toPrecision(2)}%`;

  return `${(+value).toFixed(2)}%`;
}
