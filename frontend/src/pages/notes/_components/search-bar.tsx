import { ActionIcon, Group, MantineTheme, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { ChangeEventHandler, FC } from "react";

type SearchBarProps = {
  onSearch: ChangeEventHandler<HTMLInputElement>;
};

const SearchBar: FC<SearchBarProps> = (props) => {
  const iconColor = (ThemeContext: MantineTheme) => ({
    color: ThemeContext.colors.blue[3],
  });

  return (
    <Group position="apart">
      <TextInput w={"95%"} onChange={props.onSearch} placeholder="search" />
      <ActionIcon type="submit" sx={iconColor}>
        <IconSearch />
      </ActionIcon>
    </Group>
  );
};

export { SearchBar };
export type { SearchBarProps };
