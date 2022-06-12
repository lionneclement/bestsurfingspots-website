import gql from 'graphql-tag';

export const PRODUCT_SITEMAP = gql`
  query Product {
    product(where: {size: {_is_null: false}, location: {_in: ["BADUNG", "Badung", "Denpasar"]}}) {
      id
      title
      updated_at
    }
  }
`;

export const PRODUCT = gql`
  query Product {
    product(
      limit: 100
      order_by: {facebook_group_id: desc, visit: desc}
      where: {size: {_is_null: false}, location: {_in: ["BADUNG", "Badung", "Denpasar"]}}
    ) {
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

export const PRODUCT_BY_SIZE = gql`
  query Product($size: String!, $id: Int!) {
    product(
      order_by: {facebook_group_id: desc, visit: desc}
      where: {size: {_eq: $size}, id: {_neq: $id}, location: {_in: ["BADUNG", "Badung", "Denpasar"]}}
    ) {
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
      visit
      description
      location
      picture
      price
      size
      title
      url
      facebook_group {
        description
        name
        members
        link
        status
        picture
      }
    }
  }
`;
