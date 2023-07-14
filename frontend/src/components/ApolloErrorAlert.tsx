import { ApolloError } from "@apollo/client";
import { Alert, AlertTitle } from "@mui/material";

export interface ApolloErrorAlertProps {
  error: ApolloError
}

export function ApolloErrorAlert({ error }: ApolloErrorAlertProps) {
  return (
    <Alert severity="error">
      <AlertTitle>Apollo error</AlertTitle>
      {JSON.stringify(error)}
    </Alert>
  )
}