import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import { ElevationScroll } from "./ElevationScroll";
import { NavLink } from "react-router-dom";

interface NavButtonProps {
  to: string
  children: React.ReactNode
}

function NavButton({ to, children }: NavButtonProps) {
  return (
    <Button component={NavLink} to={to}>
      {children}
    </Button>
  )
}

export function Navbar() {
  return (
    <ElevationScroll>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6" component="div" flexGrow={1}>
            WCAG Full Manual Evaluation Demo
          </Typography>

          <Stack direction="row" gap={1}>
            <NavButton to="/">Products</NavButton>
            <NavButton to="/request">New request</NavButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  )
}
