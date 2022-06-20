import gql from 'graphql-tag';

export const ADD_USER = gql`
  mutation AddUser($firebase_id: String!, $email: String, $display_name: String, $photo_url: String) {
    user: insert_user_one(
      object: {firebase_id: $firebase_id, email: $email, display_name: $display_name, photo_url: $photo_url}
    ) {
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: Int!, $display_name: String, $photo_url: String) {
    user: update_user_by_pk(pk_columns: {id: $userId}, _set: {display_name: $display_name, photo_url: $photo_url}) {
      id
    }
  }
`;
