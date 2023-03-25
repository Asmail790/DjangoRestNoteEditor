import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Grid,
  ActionIcon,
  Stack,
  Center,
} from "@mantine/core";
import { PropsWithChildren, useState } from "react";
import { NoteData, NoteDataWithID } from "../../../shared/types";
import { exampleImage } from "../../../shared/temporary-replacement";
import { Link as Actions, Path, useNavigate } from "react-router-dom";
import { Node } from "@tiptap/core";
import { RichTextViewer } from "./rich-text-viewer";
import { openConfirmModal } from "@mantine/modals";
import { IconStar } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateNotePartially } from "../../../restapi/rest-api";
import { useSetFavourite } from "../hooks/set-note-favourite-hook";
import { useRemove } from "../hooks/remove-note-hook";
import { useDeleteConfirmationModal } from "./delete-confirmation-modal";
import { useEditNote } from "../hooks/edite-note-hook";
import { StarButton } from "./star-button";
import { useLocalStorage } from "@mantine/hooks";
import { useColSpan } from "../../settings/hooks/card-col-span-hook";

type NoteCardProp = {
  note: NoteDataWithID;
};

const NoteCard: React.FC<NoteCardProp> = (props) => {
  const deleteConfirmationModal = useDeleteConfirmationModal(props.note.id);
  const editNote = useEditNote();

  const { ColumnSpanIndex, cardColSpan } = useColSpan();

  return (
    <Grid.Col
      sm={cardColSpan[ColumnSpanIndex]}
      md={cardColSpan[ColumnSpanIndex]}
    >
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Stack>
          <Group position="right">
            <StarButton note={props.note} />
          </Group>
          <Center>
            <Text weight={500}> {props.note.title}</Text>
          </Center>
          <RichTextViewer jsonContent={JSON.parse(props.note.text)} />
          <Group position="apart">
            <Button
              variant="light"
              key={0}
              color="blue"
              mt="md"
              radius="md"
              onClick={deleteConfirmationModal}
            >
              Delete
            </Button>

            <Button
              variant="light"
              key={1}
              color="blue"
              mt="md"
              radius="md"
              onClick={() => editNote(props.note.id)}
            >
              Edit
            </Button>
          </Group>
        </Stack>
      </Card>
    </Grid.Col>
  );
};

export { NoteCard };
export type { NoteCardProp };
