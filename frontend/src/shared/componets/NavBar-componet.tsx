import {
  Navbar as MantineNavbar,
  TextInput,
  NavLink,
  Box
} from "@mantine/core";
import { AcountStatus } from "./acount-status";



const Navbar: React.FC = (props) => {
  return (
<MantineNavbar width={{ sm: 300 }} height={700}>
      <MantineNavbar.Section>Logo</MantineNavbar.Section>

      <MantineNavbar.Section>
        <Box>
        <TextInput placeholder="Search" />
        <AcountStatus></AcountStatus>
        <NavLink label="settings"/>
        <NavLink label="favourite"/>
        <NavLink label="trash can"/>
        </Box>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};



export { Navbar };
