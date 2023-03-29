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
  Sx,
  Title,
  Paper,
  Button,
} from "@mantine/core";
import { FC, PropsWithChildren, useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import { css, keyframes } from "@emotion/react";
import { DefaultLayout } from "../../shared/componets/default-layout";
import {
  IconArrowLeft,
  IconArrowLeftBar,
  IconArrowRight,
  IconBorderRadius,
} from "@tabler/icons";

const gradientAnimationName = keyframes`
  0%{background-position:50% 50%}
  25%{background-position:50% 35%}
  50%{background-position:50% 50%}
  75%{background-position:50% 65%}
  100%{background-position:50% 50%}
  `;

const gradientAnimation: Sx = {
  background: "linear-gradient(8deg, OrangeRed, Indigo)",
  backgroundSize: "400% 400%",
  animation: `${gradientAnimationName} 12s ease infinite`,
};

const TextAnimation: Sx = {
  color: "linear-gradient(8deg, OrangeRed, Indigo)",
  animation: `${gradientAnimationName} 12s ease infinite`,
};

const HomePage: FC<PropsWithChildren> = (props) => {
  const [activeSlide, setSlide] = useState<number>(0);
  const navigate = useNavigate();

  // TODO make slides contain componets
  const slides = [
    <>
      <Title size="30px" color="white" align="center" weight="1">
        No need to save manually!
      </Title>
      <Text color="white" align="left">
        You don't need save notes every time you make a change. They will saved
        automatically.
      </Text>
    </>,
    <>
      <Title size="30px" color="white" align="center" weight="1">
        Write beautiful Notes !
      </Title>
      <Text color="white" align="left">
        Notes can contain list, superscript,subscript and be formated as you se
        fit.
      </Text>
    </>,
    <>
      <Title size="30px" color="white" align="center" weight="1">
        Take care of your eye !
      </Title>
      <Text color="white" align="left">
        The app comes with a light and dark theme. Take care of your eye - use
        dark theme when dark !
      </Text>
    </>,
    <>
      <Title size="30px" color="white" align="center" weight="1">
        Start using it today for free !
      </Title>

      <Button onClick={() => navigate("login")}> Log in</Button>
      <Text color="white" align="left">
        Start using it today by{" "}
        <Link style={{ color: "white", fontWeight: "700" }} to="register">
          sing up
        </Link>{" "}
        if don't have a account.
      </Text>
    </>,
  ];

  const nextStep = () =>
    setSlide(activeSlide === slides.length - 1 ? activeSlide : activeSlide + 1);
  const prevStep = () =>
    setSlide(activeSlide === 0 ? activeSlide : activeSlide - 1);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation&display=swap"
        rel="stylesheet"
      />
      <Box h="100vh" w="100vw" sx={{ ...gradientAnimation, margin: 0 }}>
        <Stack
          h="100%"
          w="100%"
          align="center"
          justify="center"
          sx={{
            margin: 0,
          }}
        >
          <Stack
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[9],
              borderRadius: "10px",
              padding: "40px",
              margin: 0,
            })}
            h="50%"
            w="50%"
            align="center"
            justify="space-between"
          >
            <Stack align="center" justify="center" w="100%" h="80%">
              <Title
                size="50px"
                align="center"
                variant="gradient"
                italic
                gradient={{ from: "red", to: "yellow", deg: 45 }}
                weight="1"
              >
                DRF+R note editor app
              </Title>
              {slides[activeSlide]}
            </Stack>
            <Group
              position="apart"
              w="100%"
              h="10%"
              sx={{ margin: 0, paddingLeft: "80px", paddingRight: "80px" }}
            >
              <IconArrowLeft
                color="purple"
                strokeWidth={2}
                size={50}
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={prevStep}
              />

              <Text color="white">
                {activeSlide + 1}/{slides.length}
              </Text>

              <IconArrowRight
                color="purple"
                strokeWidth={2}
                size={50}
                style={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={nextStep}
              />
            </Group>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

const HomePageRoute = <Route path="" element={<HomePage />}></Route>;

export { HomePage, HomePageRoute };
