import { useMutation, useQueryClient } from "react-query";
import { updateNotePartially } from "../../../restapi/rest-api";
import { NoteDataWithID } from "../../../shared/types";
import { prefixQueryKey } from "./common";

function useSetFavourite() {
  const queryClient = useQueryClient();

  return useMutation(
    async (note: NoteDataWithID) => {
      const { id } = note;
      const response = updateNotePartially({
        id,
        starMarked: !note.starMarked,
      });
      return response;
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: prefixQueryKey,
        });
      },
    }
  );
}
export { useSetFavourite };
