import {
  Box,
  Button,
  Group,
  PasswordInput,
  Space,
  TextInput,
  Text,
  List,
} from "@mantine/core";
import { useMutation } from "react-query";
import {
  createAccount,
  CreateAccountArgs,
  ServerError,
} from "../../../restapi/rest-api";
import {
  accountCredintalsProps,
  RegistrationStepProps,
} from "./registration-stepper";
import { FormValues, useCreateForm } from "../hooks/create-form-hook";

export type CreateAccountFormProps = {
  setAccountCredintals: React.Dispatch<
    React.SetStateAction<accountCredintalsProps | undefined>
  >;
} & RegistrationStepProps;

export const CreateAccountForm: React.FC<CreateAccountFormProps> = (props) => {
  const { nextStep, setAccountCredintals } = props;

  const mutation = useMutation<
    Record<string, string>,
    ServerError,
    CreateAccountArgs
  >(createAccount, {
    onSuccess(data, variables, context) {
      setAccountCredintals(variables);
      nextStep();
    },
  });

  const form = useCreateForm();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Box>
        <TextInput
          withAsterisk
          {...form.getInputProps("email")}
          label="email"
        />
        <TextInput
          withAsterisk
          {...form.getInputProps("username")}
          label="username"
        />

        <TextInput
          withAsterisk
          {...form.getInputProps("firstName")}
          label="first name"
        />
        <TextInput
          withAsterisk
          {...form.getInputProps("lastName")}
          label="last name"
        />

        <PasswordInput
          withAsterisk
          {...form.getInputProps("password")}
          label="password"
        />

        <PasswordInput
          withAsterisk
          visible={false}
          visibilityToggleIcon={() => <></>}
          {...form.getInputProps("confirmPassword")}
          label="confirm password"
        />

        <Group position="right"></Group>
        <Space h="lg"></Space>
        {mutation.error !== null ? (
          <>
            <Text>Fix the validation error indicate below to continue.</Text>
            {Object.entries(mutation.error?.messages).map(
              ([field, message]) => (
                <List>
                  <List.Item>
                    <Text fw={700} color="red">
                      {field}:
                    </Text>
                  </List.Item>

                  <List withPadding>
                    {message.map((fieldSpeficError) => (
                      <List.Item>
                        <Text color="red">{fieldSpeficError}</Text>
                      </List.Item>
                    ))}
                  </List>
                </List>
              )
            )}{" "}
          </>
        ) : null}
      </Box>

      <Group position="center" mt="xl">
        <Button type="submit">Next</Button>
      </Group>
    </form>
  );
};
