export interface MagicSeaWeedTide {
  timestamp: number;
  tide: Tide[];
  unit: string;
  sunriseTwilight: number;
  sunrise: number;
  sunsetTwilight: number;
  sunset: number;
  images: Images;
  port: Port;
}

export interface Tide {
  shift: number;
  state: string;
  unixtime: number;
  timestamp: number;
  timezoneOffset: number;
}

export interface Images {
  full: string;
}

export interface Port {
  name: string;
  lat: number;
  lon: number;
  distance: number;
  unit: string;
}
