import { NoteData,NoteDataWithID,NoteDataWithIDList } from "../shared/types";

import { isNoteDataWithID } from "../shared/type-guards";


const BASE_URL =  "http://127.0.0.1:8000"


const getNoteList = async () => {
  const response = await fetch(`${BASE_URL}/note/`);
  const noteDataList: NoteDataWithIDList = await response.json();
  return {response,noteDataList};
};


const getNote = async (id:number) => {
    const response = await fetch(`${BASE_URL}/note/${id}`)
    const note:NoteDataWithID = await response.json();
    return {response,note};
}

const saveNote = async (noteData: NoteData) => {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(noteData),
  }

  const response = await fetch(`${BASE_URL}/note/`, requestInit);

  return response;
};


const deleteNote = async (noteOrNoteID: NoteDataWithID | number) => {
    const requestInit = {
      method: "DELETE",
    }

    if (isNoteDataWithID(noteOrNoteID)) {
      const note = noteOrNoteID
      const response = await fetch(`${BASE_URL}/note/${note.id}`,requestInit );
      return response

    } else {
      const id = noteOrNoteID
      const response = await fetch(`${BASE_URL}/note/${id}`,requestInit );
      return response
    }
  };



const updateNote = async (note:NoteDataWithID) => {
  const requestInit = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(note)
  }

  const response = await fetch(`${BASE_URL}/note/${note.id}/`,requestInit)
  return response
}

export {getNoteList, saveNote, getNote, deleteNote,updateNote};
