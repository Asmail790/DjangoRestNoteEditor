import { ThemeContext } from "@emotion/react";
import {
  Accordion,
  Container,
  List,
  Space,
  Flex,
  Header,
  Stack,
  Box,
  Text,
  Center,
  Group,
  MantineTheme,
} from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import { Route } from "react-router-dom";

const HomePage: FC<PropsWithChildren> = (props) => {
  const textStyle = (theme: MantineTheme) => ({
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Header height={"60px"}>
        <Container>
          <Group>
            <Center>
              <Text sx={textStyle}>About us</Text>
              <Text sx={textStyle}>Login</Text>
              <Text sx={textStyle}>Sign in</Text>
            </Center>
          </Group>
        </Container>
      </Header>
      <Container>
        <Stack sx={{ height: "90vh" }} justify="flex-end">
          <Accordion defaultValue="customization">
            <Accordion.Item value="customization">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>
                Colors, fonts, shadows and many other parts are customizable to
                fit your design needs
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flexibility">
              <Accordion.Control>Flexibility</Accordion.Control>
              <Accordion.Panel>
                Configure components appearance and behavior with vast amount of
                settings or overwrite any part of component styles
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus-ring">
              <Accordion.Control>No annoying focus ring</Accordion.Control>
              <Accordion.Panel>
                With new :focus-visible pseudo-class focus ring appears only
                when user navigates with keyboard
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Container>
    </Box>
  );
};

const HomePageRoute = <Route path="" element={<HomePage />}></Route>;

export { HomePage, HomePageRoute };
