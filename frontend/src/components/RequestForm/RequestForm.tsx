import { Alert, AlertTitle, Container, Divider, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from '@mui/lab';
import { useMutation } from "@apollo/client";
import { ApolloErrorAlert } from "../ApolloErrorAlert";
import { Product, ProductInput } from "@/graphql";
import { UseCasesField } from "./UseCasesField";
// import { CREATE_PRODUCT_MUTATION } from "@/graphql/mutations";
import { CREATE_PRODUCT_MUTATION } from "../../graphql/mutations";
import { NavLink } from "react-router-dom";

export function RequestForm() {
  const formCtx = useForm<ProductInput>({
    defaultValues: {
      name: '',
      type: '',
      requestedBy: '',
      contact: '',
      description: '',
      risk: null,
      scopeOfWork: '',
      useCases: [],
    }
  });

  const { register, handleSubmit } = formCtx;

  const [createProduct, { loading, error, data }] = useMutation<{ createProduct: Product }>(
    CREATE_PRODUCT_MUTATION
  );

  const onSubmit = async (input: ProductInput) => {
    console.log(input);

    await createProduct({
      variables: {
        input,
      }
    });
  }

  // TODO: This *should* be a different component, obviously,
  // but I'm putting it here as a rough example of logic flow.
  if (data) {
    return (
      <Container>
        <Stack gap={2}>
          <Typography variant="h1">Thank you</Typography>
          <Typography>
            An evaluator will review your request
            for <strong>{data.createProduct.name}</strong> and
            get back to you.
          </Typography>
          <Stack direction="row" gap={1}>
            <NavLink to="/">Go home</NavLink>
            <Divider orientation="vertical" flexItem />
            <NavLink to="/request" reloadDocument>Start another request</NavLink>
          </Stack>
        </Stack>
      </Container>
    )
  }

  return (
    <FormProvider {...formCtx}>
      <Container>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */ }
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h1">Request an evaluation</Typography>

          {error &&
            <ApolloErrorAlert error={error} />
          }

          {data &&
            <Alert severity="success">
              <AlertTitle>Request created</AlertTitle>
              {JSON.stringify(data)}
            </Alert>
          }

          {/* {formState.errors &&
            <Alert severity="error">
              {JSON.stringify(formState.errors)}
            </Alert>
          } */}

          <Stack gap={2} p={2}>
            <TextField
              {...register('name', { required: true })}
              label="Product name"
              inputProps={{ 'data-testid': 'name' }}
              required
            />

            <TextField
              {...register('type', { required: true })}
              label="Product type"
              inputProps={{ 'data-testid': 'type' }}
              required
              select
            >
              <MenuItem value="Application">Application</MenuItem>
              <MenuItem value="Website">Website</MenuItem>
              <MenuItem value="PDF">PDF</MenuItem>
            </TextField>

            <TextField
              {...register('requestedBy', { required: true })}
              inputProps={{ 'data-testid': 'requestedBy' }}
              label="Requested by"
              required
            />

            <TextField
              {...register('contact', { required: true })}
              inputProps={{ 'data-testid': 'contact' }}
              label="Contact"
              required
            />

            <TextField
              {...register('description', { required: true })}
              inputProps={{ 'data-testid': 'description' }}
              label="Description"
              required
              multiline
              rows={4}
            />

            <FormControl required>
              <FormLabel id="risk-label">Risk</FormLabel>
              <RadioGroup
                {...register('risk')}
                aria-labelledby="risk-label"
              >
                <FormControlLabel
                  value="A1"
                  // Of course data attributes doesn't work for Radio input props.
                  // See: https://github.com/mui/material-ui/issues/33175
                  // control={<Radio inputProps={{ 'data-testid': 'A1Risk' }} />}
                  control={<Radio id="Risk-A1" />}
                  label={<><strong>A1 - Low:</strong> &lt;= 500 Users</>}
                />
                <FormControlLabel
                  value="A2"
                  control={<Radio />}
                  label={<><strong>A2 - Medium:</strong> 501 - 10,000 Users</>}
                />
                <FormControlLabel
                  value="A3"
                  control={<Radio />}
                  label={<><strong>A3 - High:</strong> 10,001 - 40,000 Users</>}
                />
                <FormControlLabel
                  value="A4"
                  control={<Radio />}
                  label={<><strong>A4 - Critical:</strong> &gt;40,000 Users, or Course-Related, or Open to General Public</>}
                />
              </RadioGroup>
            </FormControl>

            <Typography id="scopeOfWork-help">
              Briefly describe the work that you would like the vendor to perform. For example,
              if you would like them to evaluate only a portion or certain components of a product,
              list those components here. Similarly, if you would like the vendor to evaluate specific
              pages of a website, list those pages here, and whenever possible, hyperlink to them.

              Additionally, if you believe it will be helpful to hold a quick phone call with the vendor
              to run through your proposed scope of work, please note that in this section and the vendor's
              designated point of contact will work with you to schedule a call.
            </Typography>

            <TextField
              {...register('scopeOfWork')}
              label="Scope of work"
              // helperText={`
              //   Work that the evaluator should perform, such as evaluating specific
              //   pages of a website or individual components.
              // `}
              aria-describedby="scopeOfWork-help"
              multiline
              rows={4}
            />

            <UseCasesField />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              // disabled={Object.keys(formState.errors).length > 0}
              data-testid="submit"
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </Container>
    </FormProvider>
  );
}
