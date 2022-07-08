import { gql } from "@apollo/client";

export const COUNTRIES_QUERY = gql`
  query GetCountries {
    countries {
      code
      name
      native
      phone
      capital
      currency
      emoji
    }
  }
`;
