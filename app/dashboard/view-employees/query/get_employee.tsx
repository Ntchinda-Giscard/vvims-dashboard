import { gql } from "@apollo/client";

export const GET_EMPLOYEE_SUB = gql`
query GetEmployee($limit: Int! , $offset: Int!, $search: String = "%%", $company_id: uuid!) {
  employees(limit: $limit, offset: $offset, 
    where: {
      company_id:{_eq: $company_id},
      _or:[ {firstname:{_ilike: $search}}, {lastname:{_ilike: $search}}, {phone_number: {_ilike: $search}}, {function: {_ilike: $search}} ]
    }) {
    id
    firstname
    function
    lastname
    status
    phone_number
    position {
      text_content {
        content
      }
      id
    }
    service {
      text_content {
        content
      }
      id
    }
    agency_id
    company_id
    service_id
    status
    department {
      id
      text_content {
        content
      }
    }
  }
}`;