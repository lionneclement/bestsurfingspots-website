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
      id
    }
  }
`;

export const PRODUCT_BY_ID = gql`
  query Product($id: Int!) {
    product: product_by_pk(id: $id) {
      id
      description
      location
      picture
      price
      size
      title
      url
      facebook_group {
        name
        members
        link
        status
        picture
      }
    }
  }
`;
