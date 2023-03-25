import {
  NoteData,
  NoteDataUpdate,
  NoteDataWithID,
  NoteDataWithIDList,
  UserInfo,
  UserInfoServerSide,
} from "../shared/types";

import { isNoteDataWithID } from "../shared/type-guards";
import {
  acessJWT,
  getValidAcessToken,
} from "../shared/hooks/jwt-log-status-hook";
import { useContext } from "react";

const BASE_URL = "http://127.0.0.1:8000";



type getNoteListResponse = {
  total_pages: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: NoteDataWithIDList;
};

async function getNoteList(searchTerm: string, page: number) {
  const query =
    searchTerm === ""
      ? `${BASE_URL}/note/?page=${page}`
      : `${BASE_URL}/note/?page=${page}&search=${searchTerm}`;
  const token = await getValidAcessToken();

  const requestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(query, requestInit);
  if (response.ok) {
    const {
      count,
      next,
      total_pages,
      previous,
      results: noteDataList,
    }: getNoteListResponse = await response.json();
    return { noteDataList, total_pages, count, next, previous };
  } else {
    throw new Error(undefined, { cause: { response } });
  }
}

async function getFavourite(page: number) {
  const query = `${BASE_URL}/favourite/`;

  const token = await getValidAcessToken();
  const requestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(query, requestInit);

  if (response.ok) {
    const {
      count,
      next,
      total_pages,
      previous,
      results: noteDataList,
    }: getNoteListResponse = await response.json();

    return { noteDataList, total_pages, count, next, previous };
  } else {
    throw new Error(undefined, { cause: { response } });
  }
}

async function getNote(id: number) {
  const query = `${BASE_URL}/note/${id}`;
  const token = await getValidAcessToken();
  const requestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(query, requestInit);

  if (response.ok) {
    const note: NoteDataWithID = await response.json();
    return { note };
  } else {
    throw new Error(undefined, { cause: { response } });
  }
}

async function saveNote(noteData: NoteData) {
  const query = `${BASE_URL}/note/`;
  const token = await getValidAcessToken();
  const requestInit = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(noteData),
  };

  const response = await fetch(query, requestInit);

  if (response.ok) {
    return response;
  } else {
    throw new Error(undefined, { cause: { response } });
  }
}

async function deleteNote(noteOrNoteID: NoteDataWithID | number) {
  const token = await getValidAcessToken();
  const requestInit = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const id = isNoteDataWithID(noteOrNoteID) ? noteOrNoteID.id : noteOrNoteID;
  const query = `${BASE_URL}/note/${id}`;

  const response = await fetch(query, requestInit);

  if (response.ok) {
    return response;
  } else {
    throw new Error(undefined, { cause: { response } });
  }
}

async function login(name: string, password: string) {
  const query = `${BASE_URL}/api/token/`;
  const body = { username: name, password: password };
  const requestInit = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(query, requestInit);
  if (response.ok) {
    const tokens: { access: string; refresh: string } = await response.json();
    return { ...tokens };
  } else {
    throw new Error("Unsuccessful Login reponse.", { cause: { response } });
  }
}

async function verifyJWT(token: string) {
  const query = `${BASE_URL}/api/token/verify/`;
  const body = { token };
  const requestInit = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(query, requestInit);
  if (response.ok) {
    return response;
  } else {
    throw new Error("Unsuccessful Login reponse.", { cause: { response } });
  }
}

async function verifyAcessToken(){
  const token = acessJWT().getAcessToken()
  if (token === undefined){
    throw new Error("Acess token is undefined.");
  }
  return verifyJWT(token)
}

async function verifyRefreshToken(){
  const token = acessJWT().getRefreshToken()
  if (token === undefined){
    throw new Error("Refresh token is undefined.");
  }
  return verifyJWT(token)
}

async function refreshJWT() {
  const query = `${BASE_URL}/api/token/refresh/`;
  const token = acessJWT().getRefreshToken()
  const body = { refresh: token };
  const requestInit = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(query, requestInit);

  if (response.ok) {
    const token: { access: string } = await response.json();
    return token.access;
  } else {
    throw new Error("Unsuccessful JWT refresh.", { cause: { response } });
  }
}

async function getUserInfo() {
  const query = `${BASE_URL}/user/info`;
  const token = await getValidAcessToken();

  const requestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(query, requestInit);
  if (response.ok) {
    const userInfoServideSide: UserInfoServerSide = await response.json();
    const userInfo:UserInfo = {
      email:userInfoServideSide.email, 
      firstName: userInfoServideSide.first_name,
      lastName: userInfoServideSide.last_name,
      username: userInfoServideSide.username
    }
    return userInfo
  } else {
    throw new Error("Unsuccessful userInfo request.", { cause: { response } });
  }
}

async function updateNotePartially(note: NoteDataUpdate) {
  const query = `${BASE_URL}/note/${note.id}/`;
  const token = await getValidAcessToken();
  const requestInit = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  };
  const response = await fetch(query, requestInit);
  if (response.ok) {
    return response;
  } else {
    throw new Error("Unsuccessful partial note update.", { cause: { response } });
  }
}

async function updateNote(note: NoteDataWithID) {
  const query = `${BASE_URL}/note/${note.id}/`;
  const token = await getValidAcessToken();
  const requestInit = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(note),
  };

  const response = await fetch(query, requestInit);

  if (response.ok) {
    return response;
  } else {
    throw new Error("Unsuccessful note update.", { cause: { response } });
  }
}
export {
  getNoteList,
  saveNote,
  getNote,
  deleteNote,
  updateNote,
  updateNotePartially,
  getFavourite,
  getUserInfo,
  login,
  verifyAcessToken,
  verifyRefreshToken,
  refreshJWT,
};
