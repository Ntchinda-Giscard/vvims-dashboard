import { gql } from "@apollo/client";

export const CLOCK_IN = gql`
mutation ClockIn($employee_id: uuid!, $location: geometry = null, $building_id: uuid="eb3e-4c1d-9ec3-a71fada088eb") {
  insert_attendance_one(object: {employee_id: $employee_id, location: $location, clock_in_date: now, building_id: $building_id}){
    id
  }
}`;



export const CLOCK_OUT = gql`
mutation ClockOut($employee_id: uuid!) {
  update_attendance(where: {clock_in_date: {_eq: now}, employee_id: {_eq: $employee_id}}, _set: {clock_out_time: now}) {
    affected_rows
  }
}`