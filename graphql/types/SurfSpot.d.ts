export interface SurfSpotById {
  surf_area: {name: string};
  name: string;
  timezone: string;
  forecasts: Forecast[];
  magicseaweed_id: number;
}

export interface Forecast {
  condition_temperature: number;
  faded_rating: number;
  solid_rating: number;
  spot_id: number;
  swell_height: number;
  swell_max_breaking_height: number;
  swell_min_breaking_height: number;
  swell_primary_true_direction: number;
  swell_period: number;
  swell_unit: string;
  three_hour_time_text: string;
  timestamp: number;
  wind_compass_direction: string;
  wind_rating: number;
  wind_speed: number;
  wind_true_direction: number;
  condition_weather: string;
}

export interface SurfSpotByIdVariable {
  surfSpotId: number;
}
