import { useQuery, useQueryClient } from "react-query";
import { getNoteList } from "../../../restapi/rest-api";

function useNoteList(searchTerm: string, page: number) {
  const queryKey = ["notes", searchTerm, page];
  return useQuery(queryKey, async () => await getNoteList(searchTerm, page), {
    keepPreviousData: true,
    staleTime: 500,
  });
}

export { useNoteList };

function useIsSignedIn(userId: string) {
  return useQuery([], async () => false, {
    staleTime: 0,
  });
}
