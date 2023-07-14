import { Box, Button, Container, Toolbar } from '@mui/material';
import { Navbar } from '../components/Navbar';
import { Outlet } from 'react-router-dom';

export function Root() {
  return (
    <Box>
      <Navbar />
      <Toolbar /> {/* Just for padding */}
      <Outlet />
    </Box>
  )
}