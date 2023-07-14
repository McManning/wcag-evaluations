import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

import { Root } from './routes/Root';
import { Error } from './routes/Error';
import { Home } from './routes/Home';
import { Evaluation } from './routes/Evaluation';
import { RequestForm } from './components/RequestForm';

import { theme } from './theme';

const client = new ApolloClient({
  // TODO: I don't know the vite equivalent of NextJS/CRA's basepath
  uri: 'http://localhost:5173/graphql',
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/evaluation/:id',
        element: <Evaluation />,
      },
      {
        path: '/request',
        element: <RequestForm />,
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
