import { gql } from "@apollo/client";

export const GET_REPORT = gql`
query GetReports($limit: Int = 10, $offset: Int = 0) {
  reports(limit: $limit, offset: $offset, order_by: {created_at: desc}) {
    report_link
    types
    to_date
    from_date
    id
    name
  }
}`;


