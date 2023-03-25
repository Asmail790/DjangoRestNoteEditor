import { useNavigate } from "react-router-dom";

function useEditNote() {
  const navigate = useNavigate();
  const onEdit = (id: number) => navigate(`/note/${id}`);

  return onEdit;
}

export { useEditNote };
