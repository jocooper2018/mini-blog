import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache, makeVar, NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { User } from '../generated.ts';

let client: ApolloClient<NormalizedCacheObject> | null = null;
let cachedToken: null | string = null;

export const userConnected = makeVar<User|null>(null);
export const loggedIn = makeVar<boolean>(false);

export const getApolloClient = (token?: string | null, forceNewClient = false): ApolloClient<NormalizedCacheObject>|null => {
  if (client && !forceNewClient && (token === null || token === cachedToken)) {
    return client;
  }

  if (token) {
    cachedToken = token;
  }

  if (client && forceNewClient) {
    client?.stop();
    client = null;
  }

  const cache = new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge: true,
          },
          userConnected: {
            read() {
              return userConnected();
            },
          },
          loggedIn: {
            read() {
              return loggedIn();
            },
          },
        },
      },
    },
  });

  const authLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${localStorage.getItem(`${import.meta.env.VITE_WEBAPP_LOCAL_STORAGE_KEYNAME}:bearer-token`)}`,
    },
  }));

  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_API_BASE_GRAPHQL_URL,
  });

  client = new ApolloClient({
    cache,
    name: 'gql-client',
    version: '1.3',
    link: ApolloLink.from([ authLink, httpLink ]),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'network-only',
      },
      mutate: {
        fetchPolicy: 'no-cache',
      },
    },
  });

  return client;
};
