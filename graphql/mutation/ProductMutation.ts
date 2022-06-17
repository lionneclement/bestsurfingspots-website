import gql from 'graphql-tag';

export const UPDATE_VISIT_PRODUCT = gql`
  mutation UpdateVisitProduct($id: Int!, $visit: bigint!) {
    product: update_product_by_pk(pk_columns: {id: $id}, _set: {visit: $visit}) {
      id
    }
  }
`;


