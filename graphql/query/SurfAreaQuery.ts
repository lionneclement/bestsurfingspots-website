import gql from 'graphql-tag';

export const SURF_AREA_BY_ID = gql`
  query SurfAreaById($surfAreaId: Int!) {
    surfArea: surf_areas_by_pk(id: $surfAreaId) {
      name
      surf_spots {
        name
        solid_rating
      }
    }
  }
`;

export const SURF_AREA_SITE_MAP = gql`
  query SurfAreaSiteMap {
    surfAreas: surf_areas {
      id
      name
    }
  }
`;
