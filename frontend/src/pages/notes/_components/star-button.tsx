import { ActionIcon } from "@mantine/core";
import { IconStar } from "@tabler/icons";
import { FC } from "react";
import { NoteDataWithID } from "../../../shared/types";
import { useSetFavourite } from "../hooks/set-note-favourite-hook";

type StarButtonProps = { note: NoteDataWithID };

const StarButton: FC<StarButtonProps> = (props) => {
  const updateFavouriteStatus = useSetFavourite();
  const variant = props.note.starMarked ? "filled" : "transparent";
  return (
    <ActionIcon
      variant={variant}
      color="yellow"
      onClick={() => {
        updateFavouriteStatus.mutate(props.note);
      }}
    >
      <IconStar size={24} />
    </ActionIcon>
  );
};

export { StarButton };
