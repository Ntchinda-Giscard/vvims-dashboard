import { gql } from "@apollo/client";

export const UPDATE_EMPLOYEE_PASSWORD = gql`
    mutation MyMutation($currentPassword: String, $newPassword: String, $phoneNumber: String) {
        updateEmployeePassword(
            employeeInfo: {phoneNumber: $phoneNumber, currentPassword: $currentPassword, newPassword: $newPassword}
        ) {
            success
        }
    }`;