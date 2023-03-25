import { Grid } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { FC } from "react";
import { NoteDataWithIDList } from "../../../shared/types";
import { useColSpan } from "../../settings/hooks/card-col-span-hook";
import { NoteCard } from "./note-card";

type NoteGridProp = {
  notes: NoteDataWithIDList;
};
const NoteGrid: FC<NoteGridProp> = (props) => {
  const { columns } = useColSpan();

  const noteCards = props.notes.map((note) => (
    <NoteCard key={note.id} note={note} />
  ));

  return <Grid columns={columns}>{noteCards}</Grid>;
};

export { NoteGrid };
