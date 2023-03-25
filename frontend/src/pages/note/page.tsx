import { Button, Group, Stack, TextInput } from "@mantine/core";
import { Link, Route, useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { Navbar } from "../../shared/componets/NavBar-componet";
import { DefaultLayout } from "../../shared/componets/default-layout";

import { NoteDataUpdate } from "../../shared/types";
import { useMutation, useQuery } from "react-query";
import {
  deleteNote,
  getNote,
  updateNotePartially,
} from "../../restapi/rest-api";
import { openConfirmModal } from "@mantine/modals";
import { NoteRichTextEditor } from "./_components/rich-text-editor";
import { Editor } from "@tiptap/react";

const NotePage: React.FC = (props) => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["note", Number(id)],
    async () => getNote(Number(id))
  );
  const navigate = useNavigate();
  const deleteMutation = useMutation(
    async (noteID: number) => deleteNote(noteID),
    {
      onSuccess: (e) => navigate(-1),
    }
  );

  const onConfirm = () => deleteMutation.mutate(Number(id));

  const openModal = () =>
    openConfirmModal({
      title: "Confirm deletion of note",
      children: <p>Are you sure?</p>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: onConfirm,
    });

  const updateMutation = useMutation(async (note: NoteDataUpdate) =>
    updateNotePartially(note)
  );
  const initialText = isSuccess ? JSON.parse(data.note.text) : "";
  const initialTitle = isSuccess ? data.note.title : "";
  useEffect(() => console.log(data?.note.text), []);

  if (id === undefined) {
    return <p>id is undefined</p>;
  }

  if (isError) {
    return <p>error occured</p>;
  }

  if (isSuccess) {
    return (
      <>
        <DefaultLayout navbar={<Navbar />}>
          <Group position="right">
            <Button onClick={openModal}>Delete Note</Button>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </Group>
          <Stack h="100%" justify="center">
            <TextInput
              defaultValue={initialTitle}
              label="title"
              onChange={(event) => {
                const title = event.target.value;
                const partialNoteData: NoteDataUpdate = {
                  id: Number(id),
                  title,
                };
                updateMutation.mutate(partialNoteData);
              }}
            ></TextInput>
            <NoteRichTextEditor
              jsonContent={initialText}
              onChange={(text, rawText) => {
                updateMutation.mutate({
                  text: text,
                  rawText: rawText,
                  id: Number(id),
                });
              }}
            ></NoteRichTextEditor>
          </Stack>
        </DefaultLayout>
      </>
    );
  }

  return <>unkown state</>;
};

const NotePageRoute = <Route path="note/:id" element={<NotePage />}></Route>;

export { NotePageRoute, NotePage };
