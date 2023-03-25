import { openConfirmModal } from "@mantine/modals";
import { useRemove } from "../hooks/remove-note-hook";
import { Text } from "@mantine/core";

function useDeleteConfirmationModal(id: number) {
  const removeNote = useRemove();
  const onDelete = () => removeNote.mutate(id);

  return () =>
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This note will be deleted permently. Please click one of these buttons
          to proceed.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onConfirm: () => onDelete(),
    });
}

export { useDeleteConfirmationModal };
