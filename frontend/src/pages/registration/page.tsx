import { Container, Group, Stack } from "@mantine/core";
import { Route, RouteProps } from "react-router-dom";
import { CreateAccountForm } from "./_componets/create-account-form";
import { DefaultLayout } from "../../shared/componets/default-layout";
import { RegistrationStepper } from "./_componets/registration-stepper";

const RegistrationPage: React.FC = (props) => {
  return (
    <DefaultLayout>
      <Container>
        <Stack spacing="xl" h="90vh" justify="center">
          <Group position="center">
            <RegistrationStepper />
          </Group>
        </Stack>
      </Container>
    </DefaultLayout>
  );
};

const RegistrationPageRoute: React.FC<RouteProps> = (props) => (
  <Route path="login" element={<RegistrationPage />} />
);

export { RegistrationPageRoute, RegistrationPage };
