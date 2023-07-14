import { Accordion, AccordionDetails, AccordionSummary, Button, Stack, Typography } from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Issue } from "./Issue";
import { EvaluationInput, IssueInput } from "@/graphql";
import { IssueSummary } from "./IssueSummary";

export function IssueList() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray<EvaluationInput>({
    name: 'issues',
    control
  });

  const onAdd = () => {
    append({
      // Nothing should be filled in by default
    });
  }

  return (
    <Stack>
      Issues

      <em>TODO: Sorting, filtering, searching</em>

      {fields.map((field, idx) => (
        <Accordion key={field.id}>
          <AccordionSummary>
            <Stack width="100%" direction="row" justifyContent="space-between">
              <IssueSummary id={field.id} />
              <Button size="small" color="error" onClick={() => remove(idx)}>
                Remove
              </Button>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Issue id={field.id} />
          </AccordionDetails>
        </Accordion>
      ))}

      <Button onClick={onAdd}>Add issue</Button>
    </Stack>
  )
}
