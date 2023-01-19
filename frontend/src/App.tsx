import {RouterProvider} from "react-router-dom";

import {router} from "./routing/router-table" 

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
