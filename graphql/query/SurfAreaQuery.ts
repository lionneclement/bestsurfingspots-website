import gql from 'graphql-tag';

export const SURF_AREA_BY_ID = gql`
  query SurfArea($surfAreaId: Int!) {
    surfArea: surf_areas_by_pk(id: $surfAreaId) {
      country {
        name
        country_iso {
          name
        }
        country_seasons {
          season {
            name
          }
          month {
            name
          }
        }
      }
      name
      surf_spots {
        name
        level_surf_spots {
          level {
            name
          }
        }
      }
    }
  }
`;
