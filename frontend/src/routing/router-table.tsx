import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { NotePageRoute } from "../pages/notes/page";





const router = createBrowserRouter(
    
    createRoutesFromElements(
      <Route path="/">
        {NotePageRoute}
      </Route>
    )
  )



export {router}