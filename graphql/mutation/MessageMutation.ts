import gql from 'graphql-tag';

export const ADD_MESSAGE = gql`
  mutation AddMessage($email: String!, $content: String!) {
    message: insert_message_one(object: {email: $email, content: $content}) {
      id
    }
  }
`;
