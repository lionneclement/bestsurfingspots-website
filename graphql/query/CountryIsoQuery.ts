import gql from 'graphql-tag';

export const COUNTRY_ISO = gql`
  query CountryIso {
    countryIso: country_iso(where: {rank: {_is_null: false}}, order_by: {rank: asc}) {
      emoji
      id
      name
      rank
    }
  }
`;
