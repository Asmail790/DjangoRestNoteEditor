import { useEffect } from "react";
import { useFetch } from "./hooks/fetch-hook";
import { MantineProvider, AppShell, Container, Sx, Box, TextInput } from "@mantine/core";
import { NoteGrid } from "./componets/notegrid-componet";

import { Navbar, NavLink, createStyles } from "@mantine/core";
import { SearchBar } from "./componets/Search-bar";
import {AcountStatus } from "./componets/acount-status"
// ta bort när avbryter
// skapa hook on window onresize.
// window matchmedia
//  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
// toggle hook

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  useParams,
} from "react-router-dom";

import {router} from "./routing/router-table" 

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
