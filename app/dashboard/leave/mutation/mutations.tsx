import { gql } from "@apollo/client";

export const INSERT_LEAVE = gql`
mutation InsertLeave($comment: String = "", $employee_id: uuid = "", $end_date: date = "", $start_date: date = "", $leave_type: leave_type_enum!) {
  insert_leaves_one(object: {comment: $comment, employee_id: $employee_id, end_date: $end_date, status: PENDING, start_date: $start_date, leave_type: $leave_type}) {
    id
  }
}`;


export const DELETE_LEAVE = gql`
mutation DeleteLeave($id: uuid! ) {
  delete_leaves_by_pk(id: $id) {
    id
  }
}`;


export const ACCEPT_LEAVE = gql`
mutation AcceptLeave($id: uuid!) {
  update_leaves_by_pk(pk_columns: {id: $id}, _set: {status: ACCEPTED}) {
    id
  }
}`;

export const REJECT_LEAVE = gql`
mutation RejectLeave($id: uuid!) {
  update_leaves_by_pk(pk_columns: {id: $id}, _set: {status: REJECTED}) {
    id
  }
}`;