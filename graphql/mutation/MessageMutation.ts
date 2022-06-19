import gql from 'graphql-tag';

export const ADD_MESSAGE = gql`
  mutation AddMessage($email: String!, $content: String!, $product_id: Int!) {
    message: insert_message_one(object: {email: $email, content: $content, product_id: $product_id}) {
      id
    }
  }
`;
