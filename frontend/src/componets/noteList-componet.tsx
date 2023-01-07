import { Table } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { JsonData } from '../shared/types';



type NoteListProp = PropsWithChildren<{notes:JsonData}>


const NoteList:React.FC<NoteListProp> = (props) => {
    const rows = props.notes.map((note) => (
        <tr key={note.id}>
            <td>{note.title}</td>
            <td>{note.text}</td>
        </tr>
    ))

    return (
        <Table>
            <thead>
                <tr>
                    <th>title</th>
                    <th>text</th>
                </tr>
            </thead>
          <tbody>{rows}</tbody>
        </Table>
    )
}


export {NoteList}