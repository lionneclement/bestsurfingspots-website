import gql from 'graphql-tag';

export const ADD_EMAIL = gql`
  mutation AddEmail($email: String!) {
    email: insert_email(objects: {email: $email}) {
      affected_rows
    }
  }
`;
