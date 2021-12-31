import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem { #keystone will authenticate anything if needed so its authItem
      ... on User {  # authItem returns a Union so we need to sepcify by ... on User return the id email ..
        id
        email
        name
        # TODO: Query the cart once we have it
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}