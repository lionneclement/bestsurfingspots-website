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

export const sizeData: SizeDataTypes[] = [
  {name: 'Size ?', id: 0, value: 0},
  {name: "5'6", id: 1, value: 5.6},
  {name: "5'8", id: 2, value: 5.8},
  {name: "6'6", id: 3, value: 6.6},
  {name: "6'9", id: 4, value: 6.9},
  {name: "7'6", id: 5, value: 7.6},
  {name: '9', id: 6, value: 9},
  {name: "9'4", id: 7, value: 9.4},
  {name: '10', id: 8, value: 10}
];

export interface SizeDataTypes {
  name: string;
  id: number;
  value: number;
}

export const locationData: LocationDataTypes[] = [
  {name: 'Where ?', id: 0},
  {name: 'Los Angeles, CA', id: 1},
  {name: 'San Diego, CA', id: 2},
  {name: 'Carlsbad, CA', id: 3}
];

export interface LocationDataTypes {
  name: string;
  id: number;
}
