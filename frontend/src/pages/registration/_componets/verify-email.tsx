import { Box, Text, Button, Stack, Group } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconX } from "@tabler/icons";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { authenticateUserEmail } from "../../../restapi/rest-api";
import { ILogOut, logIn } from "../../../shared/hooks/jwt-log-status-hook";
import {
  accountCredintalsProps,
  RegistrationStepProps,
} from "./registration-stepper";

export type VerifyEmailProps = {
  accountCredintals: accountCredintalsProps | undefined;
} & RegistrationStepProps;

export const VerifyEmail: React.FC<VerifyEmailProps> = (props) => {
  const { nextStep, prevStep, accountCredintals } = props;
  const credintals = accountCredintals!!;
  const activationFailureModel = () =>
    openModal({
      title: `Please activate your account by opening the link send to your email adress ${credintals.email} before clicking next.`,
    });

  const sendMailmutation = useMutation(
    (email: string) => authenticateUserEmail(credintals.email),
    {
      // TODO check if mailjet reached max emails per xx.
    }
  );
  useEffect(() => sendMailmutation.mutate(credintals.email), []);

  const loginMutation = useMutation(
    (loginProps: ILogOut) => logIn(loginProps),
    {
      onError(error, variables, context) {
        activationFailureModel();
      },
      onSuccess(data, variables, context) {
        nextStep();
      },
    }
  );

  const resendModal = () =>
    openModal({
      title: `A new Link have been send to ${credintals.email}.`,
    });

  const onClickNextButton = () => {
    console.log(credintals);
    loginMutation.mutate({
      email: credintals.email,
      password: credintals.password,
    });
  };

  return (
    <>
      <Stack>
        <Text align="center">
          A activation click have been send to your email adress{" "}
          {credintals.email}.
        </Text>
        <Text align="center">The link will expire after one day.</Text>
        <Group position="center">
          <Button
            onClick={() => {
              sendMailmutation.mutate(credintals.email);
              resendModal();
            }}
            variant="outline"
            mt="md"
          >
            Resend activation link
          </Button>
        </Group>
      </Stack>
      <Group position="center" mt="xl">
        <Button onClick={onClickNextButton}>Next</Button>
      </Group>
    </>
  );
};
