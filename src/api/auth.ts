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
export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
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

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      handle
      avatar
      email
      joinDate
    }
  }
`;
