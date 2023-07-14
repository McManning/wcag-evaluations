import { FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form"

export interface IssueProps {
  id: string
}

export function Issue({ id }: IssueProps) {
  const { register } = useFormContext();

  const prefix = `issues.${id}.`;

  return (
    <Stack gap={2}>
      <TextField
        {...register(`${prefix}impact`, { required: true })}
        label="Impact"
        required
        select
      >
        <MenuItem value="global">Site or Application Wide Issue</MenuItem>
        <MenuItem value="page">Page-Level Issue</MenuItem>
      </TextField>

      <TextField
        {...register(`${prefix}summary`, { required: true })}
        label="Summary"
        required
      />

      <TextField
        {...register(`${prefix}details`, { required: true })}
        label="Details"
        required
        multiline
        rows={4}
      />

      <em>TODO: Screenshots</em>

      <em>TODO: WCAG violations list</em>

      <TextField
        {...register(`${prefix}remediation`, { required: true })}
        label="Recommendation for remediation"
        required
        multiline
        rows={4}
      />

      <FormControl required>
        <FormLabel id={`${prefix}priority-label`}>Indicate the priority based on the following scale</FormLabel>
        <RadioGroup
          {...register(`${prefix}priority`)}
          aria-labelledby={`${prefix}priority-label`}
        >
          <FormControlLabel
            value="Critical"
            control={<Radio />}
            label={<><strong>Critical:</strong> This issue results in blocked content for individuals with disabilities.
            Until a solution is implemented content will be completely inaccessible, making the
            organization highly vulnerable to legal action.</>}
          />
          <FormControlLabel
            value="Serious"
            control={<Radio />}
            label={<><strong>Serious:</strong> This issue results in serious barriers for individuals with disabilities.
            Until a solution is implemented, some content will be inaccessible, or significant a
            work-around is required, making the organization vulnerable to legal action. Users
            with disabilities may experience significant frustration when attempting to access content.</>}
          />
          <FormControlLabel
            value="Moderate"
            control={<Radio />}
            label={<><strong>Moderate:</strong> This issue results in some barriers for individuals with disabilities
            but would not prevent them from accessing fundamental elements or content. Users with
            disabilities may experience moderate frustration when encountering this issue.</>}
          />
          <FormControlLabel
            value="Minor"
            control={<Radio />}
            label={<><strong>Minor:</strong> This is an issue that may inconvenience a user but would not cause significant
            frustration in accessing content or accomplishing tasks.</>}
          />
        </RadioGroup>
      </FormControl>

    </Stack>
  )
}