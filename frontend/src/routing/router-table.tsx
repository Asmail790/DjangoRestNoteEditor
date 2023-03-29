import {
  createBrowserRouter,
  createRoutesFromElements,
  isRouteErrorResponse,
  Navigate,
  Outlet,
  Route,
  Routes,
  useParams,
  useRouteError,
} from "react-router-dom";

import { NotesPage, NotesPageRoute } from "../pages/notes/page";
import { NotePage, NotePageRoute } from "../pages/note/page";
import { HomePage, HomePageRoute } from "../pages/home/page";
import {
  FavouriteNotesPage,
  FavouritePageRoute,
} from "../pages/favourite-notes.tsx/page";
import { SettingPage, SettingPageRoute } from "../pages/settings/page";
import { FC, PropsWithChildren } from "react";
import { isLoggedIn, isLoggedOut } from "../shared/hooks/jwt-log-status-hook";

import { Title, Text, Paper, Stack, Space } from "@mantine/core";
import { LoginPage } from "../pages/login/page";
import { RegistrationPage } from "../pages/registration/page";
const routesObjects = [
  NotesPageRoute,
  NotePageRoute,
  HomePageRoute,
  FavouritePageRoute,
  SettingPageRoute,
];

function ProtectedPage() {
  if (isLoggedOut()) {
    return <PageNotFound />;
  }

  return <Outlet></Outlet>;
}

const PageNotFound: FC = () => {
  return (
    <Stack h="100vh" justify="center">
      <Paper>
        <Title size="100px" weight="1" align="center">
          404
        </Title>
        <Space h="xl" />
        <Text fz="xl" align="center">
          Page not found
        </Text>
      </Paper>
    </Stack>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<ProtectedPage />}>
        <Route path="notes" element={<NotesPage />} />
        <Route path="settings" element={<SettingPage />} />
        <Route path="note/:id" element={<NotePage />} />
        <Route path="favourite" element={<FavouriteNotesPage />} />
      </Route>

      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegistrationPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export { router };
