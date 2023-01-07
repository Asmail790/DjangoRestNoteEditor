import { useEffect } from "react";
import { useFetch } from "./hooks/fetch-hook";


import { NoteList } from "./componets/noteList-componet";
// ta bort när avbryter 
// skapa hook on window onresize.
// window matchmedia
//  const [count, handlers] = useCounter(0, { min: 0, max: 10 });
// toggle hook


function App() {
  const state = useFetch("http://127.0.0.1:8000/api/tasks/")
  return (<NoteList notes={state}> </NoteList>)
}







export default App;
