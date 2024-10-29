import { gql } from "@apollo/client";

export const GET_LEAVE_TYPE = gql`
query GetType @cached {
  leave_type {
    type
  }
}`;

export const GET_LEAVES = gql`
subscription GetLeaves($limit: Int = 10, $offset: Int = 0) {
  leaves(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    id
    status
    start_date
    leave_type
    end_date
    comment
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