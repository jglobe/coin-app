
const trillion = 1000000000000;
const billion = 1000000000;
const million = 1000000;

export function formatUsd(value:string|number) {
  if(value === null) return '-';
  if(+value > trillion) return (+value/trillion).toFixed(2)+'t';
  if(+value > billion) return (+value/billion).toFixed(2)+'b';
  if (+value > million) return (+value/million).toFixed(2)+'m';
  if (+value < 1 && +value > -1) return `${(+value).toPrecision(2)}`;

  return `${(+value).toFixed(2)}`;
}

export function formatPercent(value:string|number) {
  if(value === null) return '-';
  if (+value < 1 && +value > -1) return `${(+value).toPrecision(2)}`;

  return `${(+value).toFixed(2)}`;
}
