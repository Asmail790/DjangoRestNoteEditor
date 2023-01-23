import {Grid, Stack, Title } from "@mantine/core";
import { PropsWithChildren,  } from "react";
import {useQuery } from 'react-query'

import { NoteCard } from "./note-card";

import {NoteDataWithIDList } from "../../../shared/types"; 
import { getNoteList } from "../../../restapi/rest-api";
import { Loader } from '@mantine/core';

type NoteGridProp = PropsWithChildren<{ notes: NoteDataWithIDList }>;




const NoteGrid: React.FC = (props) => {
  const links = [
      {label:"Edit", link:"fakelink"},
      {label:"Delete", link:"fakelink"}
  ]
    const { isLoading, error, data } = useQuery('all-notes', async () => {
    const {noteDataList} = await getNoteList()
    const rows = noteDataList.map((note,index) => {
      return <NoteCard {...note} key={note.id}  links={links}> </NoteCard>
    })
    return rows
    })

    
    if (isLoading) {
      // TODO fix Loader postion to middle in y-axis.
      return( 
        <Stack align="center" m="lg">
            <Loader variant="dots"/>
            <Title order={1}>Loading ...</Title>
        </Stack>
      )
    }

    else if ( error) {
      return <Grid>Error have ocured</Grid>
    }
  return <Grid>{data}</Grid>;
};

export { NoteGrid };
