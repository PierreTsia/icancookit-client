import { gql } from "apollo-boost";

export const SIGNUP_USER = gql`
  mutation($email: String!, $password: String!, $handle: String!) {
    signup(email: $email, password: $password, handle: $handle) {
      token
      user {
        _id
        handle
        email
        avatar
        joinDate
      }
    }
  }
`;
