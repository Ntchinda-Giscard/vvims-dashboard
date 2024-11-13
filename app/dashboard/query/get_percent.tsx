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
  appointments(where: {employee_id: {_eq: $employee_id}, status: {_eq: PENDING}}, limit: 10, order_by: {created_at: desc}) {
    start_time
    id
    end_time
    description
    visitor {
      firstname
    }
  }
}`;

export const AGG_LEAVES_PENDING = gql`
query MyQuery {
  leaves_aggregate(where: {status: {_eq: PENDING}}) {
    aggregate {
      count
    }
  }
}`;

export const AGG_LEAVES_ACCEPTED = gql`
query MyQuery {
  leaves_aggregate(where: {status: {_eq: ACCEPTED}}) {
    aggregate {
      count
    }
  }
}`;

export const AGG_LEAVES_REJECTED = gql`
query MyQuery {
  leaves_aggregate(where: {status: {_eq: REJECTED}}) {
    aggregate {
      count
    }
  }
}`;