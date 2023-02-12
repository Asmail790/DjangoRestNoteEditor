import { Button, Container } from "@mantine/core";
import { Route } from "react-router-dom";
import React from "react";

import { Navbar } from "../../shared/componets/NavBar-componet";
import { NoteGrid } from "./_components/note-grid";
import { DefaultLayout } from "../../shared/componets/default-layout";
import { useMutation, useQueryClient } from "react-query";
import { saveNote } from "../../restapi/rest-api";
import { NoteData, NoteDataWithID } from "../../shared/types";
import { useNavigate } from "react-router-dom";
import { isNoteDataWithID } from "../../shared/type-guards";
const NotesPage: React.FC = () => {
  // TODO fix fetch notes via react query
  const emptyNote: NoteData = {
    title: "",
    text: `{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"write here"}]}]}`,
    rawText: "write here",
    starMarked: false,
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation(async () => saveNote(emptyNote), {
    onSuccess: async (respone) => {
      const note: NoteDataWithID = await respone.json();

      queryClient.setQueriesData(["note", note.id], () => note);
      navigate(`/note/${note.id}`);
    },
  });

  return (
    <DefaultLayout navbar={<Navbar />}>
      <Container>
        <Button onClick={() => mutation.mutate()}> Add Note</Button>
        <NoteGrid></NoteGrid>
      </Container>
    </DefaultLayout>
  );
};

const NotesPageRoute = <Route path="notes" element={<NotesPage />}></Route>;

export { NotesPageRoute };
