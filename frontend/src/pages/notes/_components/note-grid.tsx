import {Grid } from "@mantine/core";
import { PropsWithChildren } from "react";
import { NoteCard } from "./note-card";

import {NoteDataWithIDList } from "../../../shared/types"; 

type NoteGridProp = PropsWithChildren<{ notes: NoteDataWithIDList }>;




const NoteGrid: React.FC<NoteGridProp> = (props) => {
    const links = [
        {label:"Edit", link:"fakelink"},
        {label:"Delete", link:"fakelink"}
    ]
    const rows = props.notes.map((note) => <NoteCard key={note.id} {...note} links={links}> </NoteCard>);
  return <Grid>{rows}</Grid>;
};

export { NoteGrid };
