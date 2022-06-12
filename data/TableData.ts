export const sizeData: SizeDataTypes[] = [
  {name: "5'0", id: 1},
  {name: "5'2", id: 2},
  {name: "5'3", id: 3},
  {name: "5'4", id: 4},
  {name: "5'5", id: 5},
  {name: "5'6", id: 3},
  {name: "5'7", id: 4},
  {name: "5'8", id: 5},
  {name: "5'9", id: 6},
  {name: "5'10", id: 7},
  {name: "5'11", id: 8},
  {name: "6'0", id: 9},
  {name: "6'1", id: 10},
  {name: "6'2", id: 10},
  {name: "6'3", id: 11},
  {name: "6'4", id: 12},
  {name: "6'5", id: 13},
  {name: "6'6", id: 14},
  {name: "6'8", id: 15},
  {name: "6'9", id: 15},
  {name: "6'10", id: 16},
  {name: "6'11", id: 16},
  {name: "7'0", id: 16},
  //{name: "7'1", id: 17},
  {name: "7'2", id: 18},
  //{name: "7'3", id: 19},
  {name: "7'4", id: 19},
  //{name: "7'5", id: 19},
  {name: "7'6", id: 19},
  {name: "8'0", id: 20},
  {name: "8'1", id: 21},
  {name: "8'3", id: 21},
  {name: "8'5", id: 21},
  {name: "8'6", id: 21},
  //{name: "8'10", id: 21},
  {name: "9'0", id: 22},
  {name: "9'1", id: 22},
  {name: "9'2", id: 22},
  //{name: "9'3", id: 23},
  //{name: "9'4", id: 24},
  {name: "9'5", id: 25},
  {name: "9'6", id: 26}
  // {name: "9'8", id: 27},
  // {name: "10'0", id: 28},
  // {name: "10'6", id: 28}
];

export interface SizeDataTypes {
  name: string;
  id: number;
}

export const locationData: LocationDataTypes[] = [
  {name: 'Where ?', id: 0},
  {name: 'Badung', id: 1},
  {name: 'Denpasar', id: 2}
];

export interface LocationDataTypes {
  name: string;
  id: number;
}
