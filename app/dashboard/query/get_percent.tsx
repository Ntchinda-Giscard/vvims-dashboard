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
}`;


export const GET_TASK_COMPLETION = gql`
query MyQuery($id: UUID!) {
  getPercentageTask(id: {id: $id}) {
    percentage
  }
}`;

export const GET_EVENT_CARD = gql`
query MyQuery {
  events {
    id
    start_date
    start_time
    title
    description
  }
}`;



export const GET_RECENT_APP_CARD = gql`
query MyQuery($employee_id: uuid) {
  appointments(where: {employee_id: {_eq: $employee_id}, date: {_eq: "now"}}) {
    start_time
    id
    end_time
    description
    visitor {
      firstname
    }
  }
}`;