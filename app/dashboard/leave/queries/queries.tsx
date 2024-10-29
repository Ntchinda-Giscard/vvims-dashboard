import { gql } from "@apollo/client";

export const GET_LEAVE_TYPE = gql`
query GetType @cached {
  leave_type {
    type
  }
}`;

export const GET_LEAVES = gql`
subscription GetLeaves {
  leaves {
    id
    status
    start_date
    leave_type
    end_date
    employee {
      id
      lastname
      firstname
      function
      file {
        id
        file_url
      }

    }
  }
}`;