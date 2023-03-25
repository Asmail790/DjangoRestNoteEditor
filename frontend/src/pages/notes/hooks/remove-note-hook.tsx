import { useMutation, useQueryClient } from "react-query";
import { deleteNote } from "../../../restapi/rest-api";
import { prefixQueryKey } from "./common";

function useRemove() {
  const queryClient = useQueryClient();

  return useMutation(async (id: number) => deleteNote(id), {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: prefixQueryKey,
      }),
  });
}

export { useRemove };
