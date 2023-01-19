


/**
 * Repsenting a note.
 */
type NoteData = { 
    title: string,
    text: string
}


/**
 * Repsenting a note with a ID.
 */
type NoteDataWithID = NoteData & {
    id:number
}


type NoteDataWithIDList = NoteDataWithID[] 
type NoteDataList = NoteData[] 


export type {NoteDataWithIDList,NoteDataList,NoteDataWithID,NoteData}