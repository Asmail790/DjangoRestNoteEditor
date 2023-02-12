import {
  ActionIcon,
  Box,
  Button,
  Center,
  Grid,
  Group,
  MantineTheme,
  Pagination,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { PropsWithChildren, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { IconAdjustments, IconSearch } from "@tabler/icons";
import { NoteCard } from "./note-card";
import { NoteDataWithID, NoteDataWithIDList } from "../../../shared/types";
import { deleteNote, getNoteList } from "../../../restapi/rest-api";
import { Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { usePagination } from "@mantine/hooks";
import { ThemeContext } from "@emotion/react";
import { useForm } from "@mantine/form";

type NoteGridProp = PropsWithChildren<{ notes: NoteDataWithIDList }>;

const NoteGrid: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, SetSearchTerm] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryKey = ["notes", searchTerm, page];
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
  } = useQuery(queryKey, async () => await getNoteList(searchTerm, page), {
    keepPreviousData: true,
    staleTime: 500,
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    return <p>error</p>;
  }
  if (isSuccess) {
    const { next, total_pages, previous, noteDataList } = data;
    const noteDataList2 = noteDataList.filter((note) => note.starMarked);

    const iconColor = (ThemeContext: MantineTheme) => ({
      color: ThemeContext.colors.blue[3],
    });

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      SetSearchTerm(e.target.value);
      setPage(1);
    };
    return (
      <>
        <Group position="apart">
          <TextInput onChange={onSearch} placeholder="search" />
          <ActionIcon type="submit" sx={iconColor}>
            <IconSearch />
          </ActionIcon>
        </Group>
        <Stack justify="space-between">
          <Grid>
            {noteDataList2.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </Grid>
          <Center>
            {isFetching ? <span> Loading...</span> : null}{" "}
            <Pagination
              boundaries={1}
              page={page}
              siblings={1}
              onChange={setPage}
              total={total_pages}
            />
          </Center>
        </Stack>
      </>
    );
  }
  return <></>;
};

export { NoteGrid };
