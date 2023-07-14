
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'; // For .toHaveClass() etc

import { MockedProvider } from '@apollo/client/testing';

import { RequestForm } from '.';
import { CREATE_PRODUCT_MUTATION } from '../../graphql/mutations';

// TODO: Jest doesn't listen to my @/ alias

describe('request form', () => {
  it('renders', () => {

    // Apollo mocking needs to happen because right now the mutation
    // is built right into the form itself.
    const { getByTestId } = render(
      <MockedProvider>
        <RequestForm />
      </MockedProvider>
    );

    const name = getByTestId('name') as HTMLInputElement;
    const type = getByTestId('type') as HTMLInputElement;
    // const submit = getByTestId('submit');

    expect(name.value).toBe('');
    expect(type.value).toBe('');

    // expect(submit).toHaveClass('Mui-disabled');
  });

  it('should render thank you on submit', async () => {
    const mocks = [
      {
        request: {
          query: CREATE_PRODUCT_MUTATION,
          variables: {
            name: 'Test'
          }
        },
        result: {
          data: {
            createProduct: {
              id: '1',
              name: 'Test',
            }
          }
        }
      }
    ];

    const { getByTestId, container } = render(
      <MockedProvider mocks={mocks}>
        <RequestForm />
      </MockedProvider>
    );

    const name = getByTestId('name') as HTMLInputElement;
    const type = getByTestId('type') as HTMLInputElement;
    const requestedBy = getByTestId('requestedBy') as HTMLInputElement;
    const contact = getByTestId('contact') as HTMLInputElement;
    const description = getByTestId('description') as HTMLInputElement;
    const riskA1 = container.querySelector('#Risk-A1') as HTMLInputElement;

    name.value = 'Test';
    type.value = 'Test';
    requestedBy.value = 'Test';
    contact.value = 'Test';
    description.value = 'Test';
    riskA1.checked = true;

    const submit = await screen.findByTestId('submit');
    await userEvent.click(submit);

    // Expect transition to the thank you screen
    expect(await screen.findByText('Thank You')).toBeInTheDocument();
  });
});
