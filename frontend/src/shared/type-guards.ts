import { NoteData, NoteDataWithID, UserInfo } from "./types"



const isNoteDataWithID = (value: NoteDataWithID | number): value is NoteDataWithID => {
    return Boolean((value as any).id)
  }
  type SuccessFullLogin = {
    refresh: string;
    access: string;
  };

  type FailedLogin = {
    detail:string 
  }

const isFailedLogin = (value:SuccessFullLogin | FailedLogin ):value is FailedLogin =>  {
  return Boolean((value as any).detail)
}

const isSuccessFullLogin = (value:SuccessFullLogin | FailedLogin ):value is SuccessFullLogin =>  {
  return !isFailedLogin(value)
}

const isFullUserInfo = (value:Partial<UserInfo>):value is UserInfo => {
  return Boolean(value.email) && Boolean(value.username) && Boolean(value.firstName) && Boolean(value.lastName)
}


  export {isNoteDataWithID,isFailedLogin,isSuccessFullLogin,isFullUserInfo}