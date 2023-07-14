import { EvaluationInput } from "@/graphql";
import { LoadingButton } from "@mui/lab";
import { Checkbox, Container, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { IssueList } from "./IssueList";

export interface CheckboxSetProps {
  label: React.ReactNode
  description: React.ReactNode
  choices: Record<string, React.ReactNode>
}

export function CheckboxSet({ label, description, choices }: CheckboxSetProps) {

  return (
    <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      <FormLabel component="legend">{label}</FormLabel>
      {Object.keys(choices).map((key) =>
        <FormControlLabel
          key={key}
          control={<Checkbox checked={false} onChange={() => 0} name={key} />}
          label={choices[key]}
        />
      )}
      <FormHelperText>{description}</FormHelperText>
    </FormControl>
  )
}

export function EvaluationForm() {
  const formCtx = useForm<EvaluationInput>({
    defaultValues: {

    }
  });

  const { register, handleSubmit } = formCtx;

  const { id } = useParams();

  const onSubmit = async (input: EvaluationInput) => {
    console.log(input);

    // TODO
  }

  return (
    <FormProvider {...formCtx}>
      <Container>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */ }
        <form onSubmit={handleSubmit(onSubmit)}>

          <Stack gap={2} p={2}>
            <Typography variant="h1">Full manual evaluation</Typography>

            {/* <CheckboxSet
              label="Type of product evaluated"
              description="Check all that apply"
              choices={{
                website: 'Website',
                application: 'Web / Desktop Application',
                pdf: 'PDF',
              }}
            /> */}

            <TextField
              {...register('preparedBy', { required: true })}
              inputProps={{ 'data-testid': 'preparedBy' }}
              label="Prepared by"
              required
            />

            <Typography id="executiveSummary-help">
              Briefly describe the purpose of the digital information or digital service being evaluated
              as well as the technology stack used for the evaluation (e.g. Operating system and version,
              screen reader and browser versions). Please also provide a bulleted list of high-level issues
              discovered throughout the evaluation. Issues presented here should either be severe enough to be
              blocking issues or present in pages/interfaces throughout the evaluated content.
            </Typography>

            <TextField
              {...register('executiveSummary', { required: true })}
              inputProps={{ 'data-testid': 'executiveSummary' }}
              label="Executive Summary"
              aria-describedby="executiveSummary-help"
              required
              multiline
              rows={4}
            />

            <IssueList />

            <FormControl required>
              <FormLabel id="health-label">Overall accessibility health rating</FormLabel>
              <RadioGroup
                {...register('health')}
                aria-labelledby="health-label"
              >
                <FormControlLabel
                  value="Poor"
                  control={<Radio />}
                  label={<><strong>Poor:</strong> Digital information or digital service has one or more accessibility issues
                  that present barriers to access that have no readily apparent workarounds.
                  (e.g., inaccessible controls for keyboard or screen reader users, missing or insufficiently
                  descriptive alternatives for non-text content, missing or insufficiently descriptive input
                  field labels, lack of keyboard focus indication throughout the site or application.)</>}
                />
                <FormControlLabel
                  value="Fair"
                  control={<Radio />}
                  label={<><strong>Fair:</strong> Digital information or digital service has one or more accessibility issues
                  that do not completely block access. (e.g. poor heading structure, lack of sufficient
                  landmark structure, insufficient color contrast on text and background, insufficient
                  keyboard focus indication on non-critical elements.)</>}
                />
                <FormControlLabel
                  value="Meets Accessibility Standards"
                  control={<Radio />}
                  label={<><strong>Meets Accessibility Standards:</strong> Digital information or service fully meets
                  applicable accessibility standards.</>}
                />
              </RadioGroup>
            </FormControl>

            <LoadingButton
              type="submit"
              variant="contained"
              // loading={loading}
              // disabled={Object.keys(formState.errors).length > 0}
              data-testid="submit"
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </Container>
    </FormProvider>
  )
}
