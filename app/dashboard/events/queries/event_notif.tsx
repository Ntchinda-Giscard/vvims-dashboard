import { gql } from "@apollo/client";


export const GET_EVENT_NOTIF = gql`
subscription MySubscription2($employee_id: uuid! ) {
  employee_notifications(limit: 5, where: {employee_id: {_eq: $employee_id}}) {
    type
    title
    message
    is_read
    id
    created_at
    event_id
    action
    employee_id
    event {
      id
      event_participants {
        id
        event_id
      }
      employee {
        id
        firstname
      }
    }
  }
}
`;