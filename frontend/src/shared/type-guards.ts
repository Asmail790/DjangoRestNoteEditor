import { NoteData, NoteDataWithID } from "./types"



const isNoteDataWithID = (value: NoteDataWithID | number): value is NoteDataWithID => {
    return Boolean((value as any).id)
  }

  export {isNoteDataWithID}