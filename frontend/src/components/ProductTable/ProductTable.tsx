import { gql, useQuery } from "@apollo/client";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { Product } from "@/graphql";
import { ApolloErrorAlert } from "../ApolloErrorAlert";
import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const PRODUCT_TABLE_COLUMNS: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90
  },
  {
    field: 'name',
    headerName: 'Product',
    width: 150,
  },
  {
    field: 'evaluations',
    headerName: 'Evaluations',
    width: 250,
    renderCell: (params: GridRenderCellParams<any>) => (
      <div>
        {!params.value &&
          <em>
            No evaluations - <Link component={RouterLink} to={`/evaluation/${params.row.id}`}>
              Start evaluation
            </Link>
          </em>
        }
      </div>
    )
  }
];

export function ProductTable() {
  const { data, loading, error } = useQuery<{ products: Product[] }>(gql`
      query {
        products {
          id
          name
          evaluations {
            id
          }
        }
      }
  `);

  return (
    <Stack>
      <Typography variant="h1">Products</Typography>

      {error &&
        <ApolloErrorAlert error={error} />
      }

      <DataGrid
        rows={data?.products ?? []}
        columns={PRODUCT_TABLE_COLUMNS}
        loading={loading}
      />
    </Stack>
  )
}
