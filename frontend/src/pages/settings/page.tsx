import {
  ActionIcon,
  Box,
  Center,
  Container,
  Group,
  Paper,
  SegmentedControl,
  Stack,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useContext, useState } from "react";
import { Route } from "react-router-dom";
import { DefaultLayout } from "../../shared/componets/default-layout";
import { Navbar } from "../../shared/componets/NavBar-componet";

import { Text } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons";
import { useColSpan } from "./hooks/card-col-span-hook";
import { MantineThemes } from "../../shared/types";

const SettingPage: React.FC = () => {
  // TODO fix fetch notes via react query

  const {
    ColumnSpanIndex,
    setColumnSpanIndex,
    cardColSpan,
    numberOfCardPerRow,
  } = useColSpan();

  const [colorScheme, setColorScheme] = useLocalStorage<MantineThemes>({
    key: "color-scheme",
    defaultValue: "light",
  });

  const themes = [
    { label: "Dark theme", value: "dark" },
    { label: "light theme", value: "light" },
  ];

  const onColorSchemeChange = (s: MantineThemes) => {
    setColorScheme(s);
  };

  const onInc = () => {
    setColumnSpanIndex(
      ColumnSpanIndex < cardColSpan.length - 1
        ? ColumnSpanIndex + 1
        : ColumnSpanIndex
    );
  };
  const onDec = () => {
    setColumnSpanIndex(
      ColumnSpanIndex > 0 ? ColumnSpanIndex - 1 : ColumnSpanIndex
    );
  };

  return (
    <DefaultLayout navbar={<Navbar />}>
      <Container>
        <Paper>
          <Stack justify="space-around" spacing="xl">
            <SegmentedControl
              value={colorScheme}
              onChange={onColorSchemeChange}
              data={themes}
              key="1"
            />
            <Center>
              <Text> Number of cards per row. </Text>
            </Center>

            <Group position="apart">
              <ActionIcon onClick={onInc}>
                <IconMinus></IconMinus>
              </ActionIcon>
              <Text>{numberOfCardPerRow}</Text>
              <ActionIcon onClick={onDec}>
                <IconPlus></IconPlus>
              </ActionIcon>
            </Group>
          </Stack>
        </Paper>
      </Container>
    </DefaultLayout>
  );
};

const SettingPageRoute = (
  <Route path="settings" element={<SettingPage />}></Route>
);

export { SettingPageRoute, SettingPage };
