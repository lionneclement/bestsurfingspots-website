export interface MagicSeaWeedForecast {
  timestamp: number;
  localTimestamp: number;
  issueTimestamp: number;
  gfsIssueTimestamp: number;
  model: Model;
  fadedRating: number;
  solidRating: number;
  en_threeHourTimeText: string;
  threeHourTimeText: string;
  timezoneAbbr: string;
  hasSpectra: boolean;
  swell: Swell;
  wind: Wind;
  condition: Condition;
  charts: Charts;
}

export interface Model {
  agency: string;
  model: string;
  grid: string;
  resolution: number;
  name: string;
}

export interface Swell {
  height: number;
  absHeight: number;
  absMinBreakingHeight: number;
  absMaxBreakingHeight: number;
  incomingSwellCount: number;
  heightColor: any;
  direction: number;
  trueDirection?: number;
  compassDirection: string;
  period: number;
  absPeriod?: number;
  periodColor: any;
  probability: number;
  unit: string;
  minBreakingHeight: number;
  maxBreakingHeight: number;
  components: Components;
}

export interface Components {
  combined: Combined;
  primary?: Primary;
  secondary?: Secondary;
  tertiary?: Tertiary;
  quaternary?: Quaternary;
}

export interface Combined {
  height: number;
  absHeight: number;
  period: number;
  absPeriod: number;
  windSeaFraction: number;
  power: number;
  impact: any;
  direction: number;
  trueDirection: number;
  directionalSpread: number;
  compassDirection: string;
  isOffshore: boolean;
  type: any;
  storm: any;
  absBreakingHeight: number;
}

export interface Primary {
  height: number;
  absHeight: number;
  period: number;
  absPeriod: number;
  windSeaFraction: number;
  power: number;
  impact: number;
  direction: number;
  trueDirection: number;
  directionalSpread: number;
  compassDirection: string;
  isOffshore: boolean;
  type: number;
  storm: any;
  absBreakingHeight: number;
}

export interface Secondary {
  height: number;
  absHeight: number;
  period: number;
  absPeriod: number;
  windSeaFraction: number;
  power: number;
  impact: number;
  direction: number;
  trueDirection: number;
  directionalSpread: number;
  compassDirection: string;
  isOffshore: boolean;
  type: number;
  storm: any;
  absBreakingHeight: number;
}

export interface Tertiary {
  height: number;
  absHeight: number;
  period: number;
  absPeriod: number;
  windSeaFraction: number;
  power: number;
  impact: number;
  direction: number;
  trueDirection: number;
  directionalSpread: number;
  compassDirection: string;
  isOffshore: boolean;
  type: number;
  storm: any;
  absBreakingHeight: number;
}

export interface Quaternary {
  height: number;
  absHeight: number;
  period: number;
  absPeriod: number;
  windSeaFraction: number;
  power: number;
  impact: number;
  direction: number;
  trueDirection: number;
  directionalSpread: number;
  compassDirection: string;
  isOffshore: boolean;
  type: number;
  storm: any;
  absBreakingHeight: number;
}

export interface Wind {
  speed: number;
  speedColor: any;
  direction: number;
  trueDirection: number;
  compassDirection: string;
  chill: number;
  gusts: number;
  unit: string;
  rating: number;
  stringDirection: string;
}

export interface Condition {
  pressure: number;
  temperature: number;
  sst: number;
  weather: string;
  weatherText: string;
  unitPressure: string;
  unit: string;
}

export interface Charts {
  swell: string;
  period: string;
  wind: string;
  pressure: string;
  sst?: string;
}
