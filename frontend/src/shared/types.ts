


/**
 * Repsenting a note.
 */


type NoteData = { 
    title: string,
    text: string,
    rawText:string,
    starMarked:boolean

}
type NoteDataUpdate = {
    title?: string,
    text?: string
    rawText?:string
    starMarked?:boolean
} & {
    id:number
}


/**
 * Repsenting a note with a ID.
 */
type NoteDataWithID = NoteData & {
    id:number
}


type NoteDataWithIDList = NoteDataWithID[] 
type NoteDataList = NoteData[] 

type SuccessFullLogin = {
    refresh: string;
    access: string;
  };

  type FailedLogin = {
    detail:string 
  }

  type UserInfoServerSide = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  }

  type UserInfo = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  }


  type MantineThemes = "dark" | "light";

export type {NoteDataWithIDList,NoteDataList,NoteDataWithID,NoteData,NoteDataUpdate,SuccessFullLogin,FailedLogin,MantineThemes,UserInfo,UserInfoServerSide}