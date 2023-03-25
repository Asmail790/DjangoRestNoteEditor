import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "react-query";
import { NoteData, NoteDataWithID } from "../../../shared/types";
import { saveNote } from "../../../restapi/rest-api";

function useCreateNote() {
  const emptyNote: NoteData = {
    title: "",
    text: `{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":"left"},"content":[{"type":"text","text":"write here"}]}]}`,
    rawText: "write here",
    starMarked: false,
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(async () => saveNote(emptyNote), {
    onSuccess: async (respone) => {
      const note: NoteDataWithID = await respone.json();

      queryClient.setQueriesData(["note", note.id], () => note);
      navigate(`/note/${note.id}`);
    },
  });
}

export { useCreateNote };
