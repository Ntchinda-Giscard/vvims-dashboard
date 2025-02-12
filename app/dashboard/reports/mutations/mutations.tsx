import { gql } from "@apollo/client";


export const INSERT_REPORT = gql`
mutation InsertReports($from_date: date, $to_date: date, $types: reporttypes) {
  insert_reports_one(object: {from_date: $from_date, to_date: $to_date, types: $types}) {
    id
  }
}`;