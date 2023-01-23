import { Container } from "@mantine/core";
import { Route } from "react-router-dom";
import React from "react";

import { Navbar } from "../../shared/componets/NavBar-componet";
import { NoteGrid } from "./_components/note-grid";
import { DefaultLayout } from "../../shared/componets/default-layout";




const NotesPage:React.FC = () => {
    // TODO fix fetch notes via react query

return (<DefaultLayout navbar={<Navbar/>}>
     <Container>
            <NoteGrid ></NoteGrid>
          </Container>
    </DefaultLayout>)
}


const NotePageRoute =  <Route path="notes"  element= {<NotesPage/>}></Route>

export  {NotePageRoute}