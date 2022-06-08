import gql from 'graphql-tag';

export const PRODUCT = gql`
  query Product {
    product {
      product_pictures {
        url
      }
      price
      location
      description
      size
      title
      url
    }
  }
`;
