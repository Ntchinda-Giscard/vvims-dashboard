import { gql } from "@apollo/client";

export const GET_ATT_REPORT = gql`
query MyQuery($endDate: DateTime! , $startDate: DateTime! ) @cached {
  getReportAttandance(input: {endDate: $endDate, startDate: $startDate}) {
    date
    attendance {
      clockIn
      clockOut
      timeInBuilding
      employee {
        firstname
        id
        lastname
      }
    }
  }
}`