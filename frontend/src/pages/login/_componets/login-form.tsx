import {
  Box,
  Button,
  Container,
  Group,
  MantineProvider,
  PasswordInput,
  Space,
  TextInput,
  Text,
} from "@mantine/core";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { FormEventHandler } from "react";
import {
  Link,
  Route,
  RouteProps,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Paper } from "@mantine/core";
import { ILogOut, logIn } from "../../../shared/hooks/jwt-log-status-hook";
import { useMutation } from "react-query";

interface FormValues {
  username: string;
  password: string;
}

const LogInForm: React.FC = (props) => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      password: isNotEmpty(<Text>Empty Text</Text>),
    },
  });

  const { mutate, isError } = useMutation(
    (loginProps: ILogOut) => logIn(loginProps),
    {
      onSuccess: () => {
        navigate("../notes");
      },
    }
  );

  const onSubmit = (values: FormValues) => {
    mutate({ username: values.username, password: values.password });
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Box w="20vw" mx="md">
        <TextInput {...form.getInputProps("username")} label="Username" />
        <PasswordInput {...form.getInputProps("password")} label="Password" />

        <Group position="apart">
          <Button mt="md" type="submit">
            Login
          </Button>
          <Button
            variant="outline"
            mt="md"
            onClick={() => navigate("../register")}
          >
            create Account now
          </Button>
        </Group>
        <Space h="lg"></Space>
        {isError && <Text>Username or password is incorrect.</Text>}
      </Box>
    </form>
  );
};

const LoginRoute: React.FC<RouteProps> = (props) => (
  <Route path="login" element={<LogInForm />} />
);

export { LogInForm, LoginRoute };
