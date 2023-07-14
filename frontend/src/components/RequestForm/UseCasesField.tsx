import { Stack, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

/**
 * Custom field for a list of use cases for a product.
 *
 * Needs to be wired to an RHF context with `ProductInput` as the form data
 */
export function UseCasesField() {
  const { control } = useFormContext();

  const { fields } = useFieldArray({
    name: 'useCases',
    control
  });

  return (
    <Stack>
      <Typography id="useCases-help">
        List all the use cases for which the product is being considered so that they can be evaluated.
        (A use case is a textual description of the functionality being considered for use by the requesting
        Ohio State department. There should be a use case for each distinct functionality of the product
        being considered.)
      </Typography>

      {fields.map((field) => (
        <div key={field.id}>
          {field.id}
        </div>
      ))}
    </Stack>
  )
}
