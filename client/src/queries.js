import { gql } from 'apollo-boost';

export const GET_CHARACTERS = gql`
  {
    characters {
      id
      name
    }
  }
`;
