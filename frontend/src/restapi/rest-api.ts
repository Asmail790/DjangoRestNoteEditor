import { NoteData,NoteDataUpdate,NoteDataWithID,NoteDataWithIDList } from "../shared/types";

import { isNoteDataWithID } from "../shared/type-guards";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";


const BASE_URL =  "http://127.0.0.1:8000"

type getNoteListResponse = {
  total_pages:number
  count:number,
  next:string| null 
  previous:string| null,
  results:NoteDataWithIDList
}

const getNoteList = async (searchTerm:string,page:number) => {
  const query = searchTerm === "" ? `${BASE_URL}/note/?page=${page}`:`${BASE_URL}/note/?page=${page}&search=${searchTerm}`
  const response = await fetch(query);
  const  {
    count,
    next,
    total_pages,
    previous,
    results:noteDataList
  }:getNoteListResponse = await response.json();
  return {response,noteDataList,total_pages,count,next,previous,};
};

 

const getNote = async (id:number) => {
    const response = await fetch(`${BASE_URL}/note/${id}`)
    const note:NoteDataWithID = await response.json();
    return {response,note};
}

const saveNote = async (noteData: NoteData) => {
  console.log(noteData)
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


const updateNotePartially = async (note: NoteDataUpdate ) => {
  const requestInit = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(note)
  }
  const response = await fetch(`${BASE_URL}/note/${note.id}/`,requestInit );
  return response
}

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
export {getNoteList, saveNote, getNote, deleteNote,updateNote,updateNotePartially};
