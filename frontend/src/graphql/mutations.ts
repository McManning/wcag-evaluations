import { gql } from "@apollo/client";

export const CREATE_PRODUCT_MUTATION = gql`
  mutation ($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      dateRequested
    }
  }
`;
