import {ApolloClient, createHttpLink, from, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {RetryLink} from '@apollo/client/link/retry';
import {isDev} from '../helpers/Env';
import {logError} from '../utils/logger';

const retryLink = new RetryLink();

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API}/v1/graphql`
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(async ({message, locations, path}) => {
      logError(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError) {
    logError(`[Network error]: ${networkError}`);
  }
});

export const graphqlClient = new ApolloClient({
  link: from([errorLink, retryLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: isDev()
});
