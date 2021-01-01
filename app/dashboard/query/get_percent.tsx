import { gql } from "@apollo/client";




export const GET_PERCENT = gql`
query MySubscription @cached {
  getAttendancePercentage {
    attendancePercentage
    totalEmployee
  }
}`;

export const GET_TOT_LEAVE_EMPLOYEE = gql`
query MyQuery {
  getTotalEmployeeOnLeave {
    total
  }
}`