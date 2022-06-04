export interface MagicSeaWeedForecast {
  timestamp: number;
  fadedRating: number;
  solidRating: number;
  threeHourTimeText: string;
  swell: Swell;
  wind: Wind;
  condition: Condition;
  localTimestamp: number;
}

export interface Swell {
  height: number;
  period: number;
  unit: string;
  minBreakingHeight: number;
  maxBreakingHeight: number;
  components: Components;
}

export interface Components {
  primary: Primary;
}

export interface Primary {
  trueDirection: number;
}

export interface Wind {
  speed: number;
  trueDirection: number;
  compassDirection: string;
  rating: number;
}

export interface Condition {
  temperature: number;
  weather: string;
}
