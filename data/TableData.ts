export interface ContinentDataTypes {
  name: string;
  id: number;
}

export const continentData: ContinentDataTypes[] = [
  {name: 'Where ?', id: 0},
  {name: '🌎 North America', id: 1},
  {name: '💃 Latin America', id: 2},
  {name: '🇪🇺 Europe', id: 3},
  {name: '🌍 Africa', id: 4},
  {name: '⛩ Asia', id: 5},
  {name: '🏄 Oceania', id: 7}
];

export interface CostOfLivingDataTypes {
  name: string;
  costOfLiving: number;
  id: number;
  slugify?: string;
}

export const costOfLivingData: CostOfLivingDataTypes[] = [
  {name: 'Cost of living ?', costOfLiving: 10000, id: 0},
  {name: '💰<$1K/mo', costOfLiving: 1000, id: 1, slugify: 'countries-on-a-budget'},
  {name: '💰<$2K/mo', costOfLiving: 2000, id: 2, slugify: 'cheap-countries'}
];
