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
import queryString from "query-string";

const BASE_URL = "http://127.0.0.1:8000";

export type CreateAccountArgs = {
  username:string
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export class ServerError extends Error {
  constructor(public readonly messages: Record<string, string[]>) {
    super()
    this.name = ServerError.name
  }
}

export async function createAccount(args: CreateAccountArgs) {
  type CreateAccountBackendArgs = {
    username:string;
    first_name: string;
    last_name: string;
    password: string;
    email: string;
  };

  const url = `${BASE_URL}/user/create`;
  const payload: CreateAccountBackendArgs = {
    username:args.username,
    first_name: args.firstName,
    last_name: args.lastName,
    password: args.password,
    email: args.email,
  };

  console.log(payload)

  const request = {
    method: "POST",
    body: JSON.stringify(payload),
  }

  const response = await fetch(url, request);
  
  if (response.ok) {
    const accountInfo: CreateAccountBackendArgs = await response.json();
    return accountInfo;
  } else {
    const errors:Record<string,string[]> = await response.json()
    throw new ServerError(errors);
  }
}

export async function authenticateUserEmail(email: string) {
  const url = `${BASE_URL}/user/authenticate-email/`;

  const completeURL = queryString.stringifyUrl({
    url: url,
    query: { email: email },
  });

  const request = {
    method: "POST",
  
  }
  

  const response = await fetch(completeURL,request);

  if (response.ok) {
    return response;
  } else {
    throw new Error(undefined, { cause: { response } });
  }
}

export type getNoteListResponse = {
  total_pages: number;
  count: number;
  next: string | null;
  previous: string | null;
  results: NoteDataWithIDList;
};

export async function getNoteList(searchTerm: string, page: number) {
  
  const url =
    searchTerm === ""
      ? `${BASE_URL}/note/?page=${page}`
      : `${BASE_URL}/note/?page=${page}&search=${searchTerm}`;
  const token = await getValidAcessToken();

  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, request);
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

export async function getFavourite(page: number) {
  const url = `${BASE_URL}/favourite/`;

  const token = await getValidAcessToken();
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(url, request);

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

export async function getNote(id: number) {
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

export async function saveNote(noteData: NoteData) {
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

  /**
   *  owner = models.ForeignKey(
        EmailUniqueUser, on_delete=models.CASCADE)
    title = models.TextField(blank=True)
    starMarked = models.BooleanField(default=False)
    text = models.TextField(blank=True)
    rawText = models.TextField(blank=True)
   */
  console.log(noteData)

  const response = await fetch(query, requestInit);

  if (response.ok) {
    return response;
  } else {
    throw new Error(undefined, { cause: { response } });
  }
}

export async function deleteNote(noteOrNoteID: NoteDataWithID | number) {
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

export async function login(email: string, password: string) {
  const query = `${BASE_URL}/api/token/`;
  const body = { email: email, password: password };
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

export async function verifyJWT(token: string) {
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

export async function verifyAcessToken() {
  const token = acessJWT().getAcessToken();
  if (token === undefined) {
    throw new Error("Acess token is undefined.");
  }
  return verifyJWT(token);
}

export async function verifyRefreshToken() {
  const token = acessJWT().getRefreshToken();
  if (token === undefined) {
    throw new Error("Refresh token is undefined.");
  }
  return verifyJWT(token);
}

export async function refreshJWT() {
  const query = `${BASE_URL}/api/token/refresh/`;
  const token = acessJWT().getRefreshToken();
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

export async function getUserInfo() {
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
   
    const userInfo: UserInfo = {
      email: userInfoServideSide.email,
      firstName: userInfoServideSide.first_name,
      lastName: userInfoServideSide.last_name,
      username: userInfoServideSide.username,
    };
    return userInfo;
  } else {
    throw new Error("Unsuccessful userInfo request.", { cause: { response } });
  }
}

export async function updateNotePartially(note: NoteDataUpdate) {
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
    throw new Error("Unsuccessful partial note update.", {
      cause: { response },
    });
  }
}

export async function updateNote(note: NoteDataWithID) {
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
