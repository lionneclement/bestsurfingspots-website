import gql from 'graphql-tag';

export const PRODUCT_SITEMAP = gql`
  query Product {
    product(
      where: {
        size: {_is_null: false}
        location: {_in: ["BADUNG", "Badung", "Denpasar"]}
        product_pictures: {url: {_is_null: false}}
      }
    ) {
      id
      title
      updated_at
    }
  }
`;

export const PRODUCT = gql`
  query Product {
    product(
      order_by: {facebook_group_id: desc, visit: desc}
      where: {
        visible: {_eq: true}
        size: {_is_null: false}
        location: {_in: ["BADUNG", "Badung", "Denpasar"]}
        product_pictures: {url: {_is_null: false}}
      }
    ) {
      picture
      price
      location
      description
      size
      title
      id
      product_pictures {
        url
      }
    }
  }
`;

export const PRODUCT_BY_SIZE = gql`
  query Product($size: String!, $id: Int!) {
    product(
      order_by: {facebook_group_id: desc, visit: desc}
      where: {
        visible: {_eq: true}
        size: {_eq: $size}
        id: {_neq: $id}
        location: {_in: ["BADUNG", "Badung", "Denpasar"]}
        product_pictures: {url: {_is_null: false}}
      }
    ) {
      picture
      price
      location
      description
      size
      title
      id
      product_pictures {
        url
      }
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
      product_pictures {
        url
      }
    }
  }
`;
