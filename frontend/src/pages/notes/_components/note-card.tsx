import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Grid,
  ActionIcon,
} from "@mantine/core";
import { PropsWithChildren, useState } from "react";
import { NoteData, NoteDataWithID } from "../../../shared/types";
import { exampleImage } from "../../../shared/temporary-replacement";
import { Link as Actions, Path } from "react-router-dom";
import { Node } from "@tiptap/core";
import { RichTextViewer } from "./rich-text-viewer";
import { openConfirmModal } from "@mantine/modals";
import { IconStar } from "@tabler/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateNotePartially } from "../../../restapi/rest-api";

type NoteCardProp = {
  note: NoteDataWithID;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const NoteCard: React.FC<NoteCardProp> = (props) => {
  const [starMark, setStarMark] = useState(props.note.starMarked);

  const openModal = () =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This note will be deleted permently. Please click one of these buttons
          to proceed.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => props.onDelete(props.note.id),
    });

  const queryClient = useQueryClient();

  const updateStarMark = useMutation(
    async (note: NoteDataWithID) => {
      const { id } = note;
      const response = updateNotePartially({ id, starMarked: !starMark });
      return response;
    },
    {
      onSuccess: async (response) => {
        const note: NoteDataWithID = await response.json();
        setStarMark((prev) => note.starMarked);
      },
    }
  );

  const StartButton = () => {
    const variant = starMark ? "filled" : "transparent";
    return (
      <ActionIcon
        variant={variant}
        color="yellow"
        onClick={() => {
          updateStarMark.mutate(props.note);
        }}
      >
        <IconStar size={24} />
      </ActionIcon>
    );
  };

  return (
    <Grid.Col sm={12} md={4}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={exampleImage.src}
            height={exampleImage.height}
            alt={exampleImage.alt}
          />
        </Card.Section>

        <Text weight={500}> {props.note.title}</Text>
        <RichTextViewer jsonContent={JSON.parse(props.note.text)} />
        <Group position="apart">
          <Group>
            <Button
              variant="light"
              key={0}
              color="blue"
              mt="md"
              radius="md"
              onClick={openModal}
            >
              Delete
            </Button>

            <Button
              variant="light"
              key={1}
              color="blue"
              mt="md"
              radius="md"
              onClick={() => props.onEdit(props.note.id)}
            >
              Edit
            </Button>
            <StartButton />
          </Group>
        </Group>
      </Card>
    </Grid.Col>
  );
};

export { NoteCard };
