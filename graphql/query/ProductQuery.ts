import gql from 'graphql-tag';

export const PRODUCT = gql`
  query Product {
    product(where: {size: {_is_null: false}}) {
      picture
      price
      location
      description
      size
      title
      url
    }
  }
`;
