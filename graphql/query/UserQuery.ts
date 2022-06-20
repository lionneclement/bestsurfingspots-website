import gql from 'graphql-tag';

export const USER = gql`
  query User($firebase_id: String!) {
    user(where: {firebase_id: {_eq: $firebase_id}}) {
      id
    }
  }
`;
