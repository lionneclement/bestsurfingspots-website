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
    }
  }
`;

export const SURF_SPOT_SITE_MAP = gql`
  query SurfSpotSiteMap {
    surfSpots: surf_spots {
      id
      name
    }
  }
`;
