import { useEffect } from "react";
import { useFetch } from "./hooks/fetch-hook";
import { MantineProvider, AppShell, Header, Container } from "@mantine/core";
import { NoteGrid } from "./componets/NoteGrid-componet";

import { Navbar, NavLink, createStyles } from "@mantine/core";
// ta bort när avbryter
// skapa hook on window onresize.
// window matchmedia
//  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
// toggle hook

const useStyles = createStyles((theme, _params, getRef) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.md * 1.5,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },
}));

function App() {
  const state = useFetch("http://127.0.0.1:8000/api/tasks/");

  const navbar = (
    <Navbar width={{ sm: 200 }} height={700}>
      <Navbar.Section>Logo</Navbar.Section>

      <Navbar.Section
        sx={(theme) => {
          return {};
        }}
      >
        <NavLink label="Active subtle" variant="subtle" />
        <NavLink label="Active subtle" variant="subtle" />
        <NavLink active={true} description={"item.description"} color="teal" />
      </Navbar.Section>
    </Navbar>
  );
  return (
    <MantineProvider>
      <AppShell navbar={navbar}>
        <Container>
          <NoteGrid notes={state}></NoteGrid>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
