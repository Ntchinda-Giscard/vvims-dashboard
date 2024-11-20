import { gql } from "@apollo/client";


export const GET_EVENTS = gql`
subscription MyQuery {
  events {
    id
    title
    start_date
    start_time
    end_time
    event_participants {
      employee {
        firstname
        lastname
        id
        file {
          file_url
          id
        }
      }
    }
    event_participants_aggregate {
      aggregate {
        count
      }
    }
    tasks_aggregate {
      aggregate {
        count
      }
    }
    employee {
      id
      firstname
      lastname
      file {
        id
        file_url
      }
    }
  }
}`;