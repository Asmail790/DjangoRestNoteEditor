import { Container, Group, Stack } from "@mantine/core";
import { DefaultLayout } from "../../shared/componets/default-layout";
import { Navbar } from "../../shared/componets/NavBar-componet";
import { LogInForm } from "./_componets/login-form";

function LoginPage() {
  return (
    <DefaultLayout>
      <Container>
        <Stack spacing="xl" h="90vh" justify="center">
          <Group position="center">
            <LogInForm></LogInForm>
          </Group>
        </Stack>
      </Container>
    </DefaultLayout>
  );
}

export { LoginPage };
