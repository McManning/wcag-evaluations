import { useQuery, gql } from '@apollo/client';
import { Box, Button, Container } from '@mui/material';
import { RequestForm } from '../components/RequestForm';
import { ProductTable } from '../components/ProductTable';

export function Home() {
  return (
    <Container>
      <ProductTable />
    </Container>
  )
}