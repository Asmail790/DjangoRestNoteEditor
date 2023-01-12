import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { HomePage } from "../views/home-view";
import { LoginPage } from "../views/login-view";




const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<HomePage/>} path="/" />
        <Route  element={<LoginPage/>} path="/login"/>
        <Route element={<p>add Note</p>} path="/new" />
        <Route element={<p>settings</p>} path="/settings" />
      </Route>
    )
  )



export {router}