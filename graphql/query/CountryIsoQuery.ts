import gql from 'graphql-tag';

export const HOME_COUNTRY_ISO = gql`
  query HomeCountryIso {
    countryIso: country_iso(
      where: {
        emoji: {_is_null: false}
        cost_of_livings: {single_person: {_is_null: false}}
        language_country_isos: {language: {name: {_is_null: false}}}
        continent: {name: {_is_null: false}}
      }
    ) {
      emoji
      id
      name
      image
      cost_of_livings {
        single_person
      }
      language_country_isos {
        language {
          name
        }
      }
      continent {
        id
        name
      }
    }
  }
`;

export const COUNTRY_ISO_BY_ID = gql`
  query CountryIsoById($countryId: Int!) {
    countryIso: country_iso_by_pk(id: $countryId) {
      peace
      image
      emoji
      population
      mobile_speed
      broadband_speed
      continent {
        name
      }
      name
      language_country_isos {
        language {
          name
        }
      }
      cost_of_livings {
        beer
        cigarettes
        coffee
        dinner
        family
        single_person
      }
      countries(where: {surf_areas: {id: {_is_null: false}}}) {
        name
        surf_areas {
          id
          name
          surf_spots_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
`;

export const COUNTRY_ISO_SITE_MAP = gql`
  query CountryIsoSiteMap {
    countryIso: country_iso(
      where: {
        emoji: {_is_null: false}
        cost_of_livings: {single_person: {_is_null: false}}
        language_country_isos: {language: {name: {_is_null: false}}}
        continent: {name: {_is_null: false}}
      }
    ) {
      id
      name
      updated_at
    }
  }
`;
