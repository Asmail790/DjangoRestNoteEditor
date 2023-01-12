import { AppShell, Container, MantineProvider } from "@mantine/core";
import { NoteGrid } from "../componets/notegrid-componet";
import { useFetch } from "../hooks/fetch-hook";
import { Navbar } from "../componets/NavBar-componet";
import { Route, RouteProps  } from "react-router-dom";





const HomePage:React.FC =(props) => {
    const state = useFetch("http://127.0.0.1:8000/api/tasks/");
    return (
      <MantineProvider>
        <AppShell navbar={<Navbar/>}>
          <Container>
            <NoteGrid notes={state}></NoteGrid>
          </Container>
        </AppShell>
      </MantineProvider>
    );
  }

const HomeRoute:React.FC<RouteProps> = (props) => <Route path="home"  element= {<HomePage></HomePage>}/>

export  {HomeRoute,HomePage}