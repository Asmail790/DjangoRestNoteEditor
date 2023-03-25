import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { ChangeEventHandler, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Route, useNavigate } from "react-router-dom";
import { deleteNote, getFavourite, getNoteList } from "../../restapi/rest-api";
import { DefaultLayout } from "../../shared/componets/default-layout";
import { useCreateNote } from "../notes/hooks/create-note-hook";
import { NoteGrid } from "../notes/_components/note-grid";
import { Navbar } from "../../shared/componets/NavBar-componet";
import { Pagination } from "../notes/_components/pagination";

const FavouriteNotesPage: React.FC = () => {
  // TODO fix fetch notes via react query

  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryKey = ["notes", page];
  const mutation = useMutation(async (id: number) => deleteNote(id), {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: queryKey,
      }),
  });

  const onDelete = (id: number) => mutation.mutate(id);
  const onEdit = (id: number) => navigate(`/note/${id}`);

  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
    isSuccess,
    refetch,
  } = useQuery(queryKey, async () => await getFavourite(page), {
    keepPreviousData: true,
    staleTime: 500,
  });

  if (isError) {
    return <p>Error ocured</p>;
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isSuccess) {
    const { next, total_pages: totalPages, previous, noteDataList } = data;

    return (
      <DefaultLayout navbar={<Navbar />}>
        <Container>
          <Stack justify="space-between" spacing="xl">
            <Center>
              <Title order={1}>Favourite</Title>
            </Center>
            <NoteGrid notes={noteDataList.filter((note) => note.starMarked)} />
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

const FavouritePageRoute = (
  <Route path="favourite" element={<FavouriteNotesPage />}></Route>
);

export { FavouritePageRoute, FavouriteNotesPage };
