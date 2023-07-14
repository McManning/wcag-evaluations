import { Typography, Link } from "@mui/material"
import { useFormContext } from "react-hook-form"
import { Link as RouterLink } from 'react-router-dom';

export interface IssueSummaryProps {
  id: string
}

export function IssueSummary({ id }: IssueSummaryProps) {
  const { watch } = useFormContext();

  const impact = watch(`issues.${id}.impact`) as string;
  const summary = watch(`issues.${id}.summary`) as string;
  const priority = watch(`issues.${id}.priority`) as string;

  return (
    <Typography>
      {priority}
      Issue {id.substring(0, 5)} - {impact} - {summary}
      &nbsp;
      <Link fontSize="small" component={RouterLink} to={'#' + id}>
        Permalink
      </Link>
    </Typography>
  )
}