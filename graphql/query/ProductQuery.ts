import gql from 'graphql-tag';

export const PRODUCT = gql`
  query Product {
    product {
      product_pictures {
        url
      }
      picture
      price
      location
      description
      size_string
      title
      url
    }
  }
`;
