import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { NotesPageRoute } from "../pages/notes/page";
import { NotePageRoute } from "../pages/note/page";

const routesObjects = [NotesPageRoute, NotePageRoute];
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/">{routesObjects}</Route>)
);

export { router };
