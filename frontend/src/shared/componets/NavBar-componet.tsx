import {
  Navbar as MantineNavbar,
  TextInput,
  NavLink,
  Box,
  Paper,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { AcountStatus } from "./acount-status";

const Navbar: React.FC = (props) => {
  return (
    <Paper>
      <MantineNavbar width={{ sm: 300 }} height={"100vh"}>
        <MantineNavbar.Section>
          <Box>
            <AcountStatus></AcountStatus>
            <Link style={{ textDecoration: "none" }} to="/settings">
              <NavLink label="settings" />
            </Link>
            <Link style={{ textDecoration: "none" }} to="/favourite">
              <NavLink label="favourite" />
            </Link>
            <Link style={{ textDecoration: "none" }} to="/notes">
              <NavLink label="notes" />
            </Link>

            <Link style={{ textDecoration: "none" }} to="/">
              <NavLink label="home" />
            </Link>
          </Box>
        </MantineNavbar.Section>
      </MantineNavbar>
    </Paper>
  );
};

export { Navbar };
