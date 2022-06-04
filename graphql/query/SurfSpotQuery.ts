import {gql} from '@apollo/client';

export const SURF_SPOT_BY_ID = gql`
  query SurfSpotById($surfSpotId: Int!) {
    surfSpot: surf_spots_by_pk(id: $surfSpotId) {
      surf_area {
        name
      }
      magicseaweed_id
      name
      timezone
      forecasts(where: {three_hour_time_text: {_in: ["6am", "Noon", "6pm"]}}, order_by: {timestamp: asc}) {
        condition_temperature
        faded_rating
        solid_rating
        swell_height
        swell_max_breaking_height
        swell_min_breaking_height
        swell_primary_true_direction
        swell_period
        swell_unit
        three_hour_time_text
        timestamp
        wind_compass_direction
        wind_rating
        wind_speed
        wind_true_direction
        condition_weather
      }
    }
  }
`;
