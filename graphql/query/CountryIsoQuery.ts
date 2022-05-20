import gql from 'graphql-tag';

export const COUNTRY_ISO = gql`
  query CountryIso {
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
