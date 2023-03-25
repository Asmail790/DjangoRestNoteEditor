import { Box, Button, Container, Group, Stack } from "@mantine/core";
import { Route } from "react-router-dom";
import React, { ChangeEventHandler, createContext, useState } from "react";

import { Navbar } from "../../shared/componets/NavBar-componet";
import { DefaultLayout } from "../../shared/componets/default-layout";
import { useMutation, useQueryClient, useQuery } from "react-query";
import {
  deleteNote,
  getNoteList,
  saveNote,
  updateNotePartially,
} from "../../restapi/rest-api";
import { NoteData, NoteDataWithID } from "../../shared/types";
import { useNavigate } from "react-router-dom";
import { isNoteDataWithID } from "../../shared/type-guards";
import { Avatar } from "@mantine/core";
import { ThemeContext } from "@emotion/react";
import { IconPlus } from "@tabler/icons";
import { useCreateNote } from "./hooks/create-note-hook";
import { NoteGrid } from "./_components/note-grid";
import { Pagination } from "./_components/pagination";
import { SearchBar } from "./_components/search-bar";
import { useRemove } from "./hooks/remove-note-hook";
import { useNoteList } from "./hooks/get-note-list-hook";

const NotesPage: React.FC = () => {
  // TODO fix fetch notes via react query

  const [page, setPage] = useState(1);
  const [searchTerm, SetSearchTerm] = useState("");

  const remove = useRemove();
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
    isSuccess,
  } = useNoteList(searchTerm, page);

  const create = useCreateNote();

  const onSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    SetSearchTerm(e.target.value);
    setPage(1);
  };

  if (isError) {
    return <p>Error ocured</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isSuccess) {
    const { total_pages: totalPages, noteDataList } = data;

    return (
      <DefaultLayout navbar={<Navbar />}>
        <Container>
          <Stack spacing="xl" justify="space-between">
            <Group position="right">
              <Button onClick={() => create.mutate()}>
                <IconPlus></IconPlus>
              </Button>
            </Group>
            <SearchBar onSearch={onSearch} />
            <NoteGrid notes={noteDataList} />
            <Box h={"50px"} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          </Stack>
        </Container>
      </DefaultLayout>
    );
  }

  return <p>Unkown state</p>;
};

const NotesPageRoute = <Route path="notes" element={<NotesPage />}></Route>;

export { NotesPageRoute, NotesPage };
