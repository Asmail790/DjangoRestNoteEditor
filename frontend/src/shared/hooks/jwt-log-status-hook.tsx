import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import { QueryClient, QueryObserver, useMutation, useQuery } from "react-query";
import { login, refreshJWT } from "../../restapi/rest-api";
import jwt_decode from "jwt-decode";
import { JwtPayload } from "jwt-decode";

interface IGetFromLocalStorage {
  key: string;
}

type TokenType = string | undefined;

function isTokenDefined(token: TokenType): token is string {
  return token !== undefined;
}

function isTokenUndefined(token: TokenType): token is undefined {
  return !isTokenDefined(token);
}

function getFromLocalStorage(props: IGetFromLocalStorage): TokenType {
  const { key } = props;
  const item = localStorage.getItem(key);
  return item !== null ? item : undefined;
}

interface ISaveInLocalStorage {
  key: string;
  item: string;
}

function saveInLocalStorage(props: ISaveInLocalStorage): void {
  const { key, item } = props;
  localStorage.setItem(key, item);
}

interface IRemoveItemInLocalStorage {
  key: string;
}

function removeItemInLocalStorage(props: IRemoveItemInLocalStorage): void {
  const { key } = props;
  localStorage.removeItem(key);
}

const acessTokenKey = "acess-token";
const refreshTokenKey = "refresh-token";

function acessJWT() {
  const setAcessToken = (token: string) =>
    saveInLocalStorage({ key: acessTokenKey, item: token });

  const getAcessToken = () =>
    getFromLocalStorage({
      key: acessTokenKey,
    });

  const setRefreshToken = (token: string) =>
    saveInLocalStorage({ key: refreshTokenKey, item: token });

  const getRefreshToken = () =>
    getFromLocalStorage({
      key: refreshTokenKey,
    });

  return {
    setAcessToken,
    getAcessToken,
    setRefreshToken,
    getRefreshToken,
  };
}

function logOut() {
  removeItemInLocalStorage({ key: acessTokenKey });
  removeItemInLocalStorage({ key: refreshTokenKey });
}
interface ILogOut {
  email: string;
  password: string;
}

async function logIn(props: ILogOut) {
  const { email: username, password } = props;
  try {
    const { access, refresh } = await login(username, password);
    const { setAcessToken, setRefreshToken } = acessJWT();
    setAcessToken(access);
    setRefreshToken(refresh);
  } catch (error) {
    throw new Error("Login falied.", { cause: error });
  }
}

function isLoggedOut(): boolean {
  const { getRefreshToken } = acessJWT();
  const token = getRefreshToken();

  if (isTokenUndefined(token)) {
    return true;
  }
  return isTokenExperied(token);
}

function isLoggedIn(): boolean {
  return !isLoggedIn();
}

function timeLeftBeforeExperie(token: string): number {
  const decodedToken = jwt_decode(token) as JwtPayload;
  const expirationTime = decodedToken.exp!; // check
  const oneSecond = 1000;
  const UTCExpirationTime = expirationTime * oneSecond;
  const expirationDate = new Date(UTCExpirationTime);
  const curentDate = new Date();
  const secondsLeftBeforeExpire =
    (expirationDate.getTime() - curentDate.getTime()) / oneSecond;

  return secondsLeftBeforeExpire < 0 ? 0 : secondsLeftBeforeExpire;
}

function isTokenExperied(token: string): boolean {
  const secondsLeftBeforeExpire = timeLeftBeforeExperie(token);
  const isExpired = secondsLeftBeforeExpire === 0;
  return isExpired;
}

async function refreshAcessToken(timeToRefresh: number) {
  const { getAcessToken, getRefreshToken, setAcessToken } = acessJWT();
  const acessToken = getAcessToken();
  const refreshToken = getRefreshToken();

  if (isTokenUndefined(acessToken)) {
    throw new Error("Acess token is undefined.");
  }

  if (isTokenUndefined(refreshToken)) {
    throw new Error("Refresh token is undefined.");
  }
  if (isTokenExperied(refreshToken)) {
    throw new Error("Refresh token is expired.");
  }

  if (timeLeftBeforeExperie(acessToken) < timeToRefresh) {
    const newAcessToken = await refreshJWT();
    setAcessToken(newAcessToken);
  }
}

async function getValidAcessToken() {
  const result = await refreshAcessToken(5);
  return acessJWT().getAcessToken();
}

export {
  logOut,
  logIn,
  isLoggedOut,
  isLoggedIn,
  refreshAcessToken,
  acessJWT,
  getValidAcessToken,
};
export type { ILogOut };
