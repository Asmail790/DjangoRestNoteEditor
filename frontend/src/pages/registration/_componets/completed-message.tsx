import { Box, Text, Button, Stack, Group } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUserEmail } from "../../../restapi/rest-api";
import { ILogOut, logIn } from "../../../shared/hooks/jwt-log-status-hook";
import {
  accountCredintalsProps,
  RegistrationStepProps,
} from "./registration-stepper";

export type CompletedMessageProps = {
  accountCredintals: accountCredintalsProps | undefined;
} & RegistrationStepProps;

export const CompletedMessage: React.FC<CompletedMessageProps> = (props) => {
  const { nextStep, prevStep, accountCredintals } = props;
  const credintals = accountCredintals!!;

  return (
    <Text align="center">
      Your account is activated.
      <Link to="../notes">Click here to go to the note page.</Link>
    </Text>
  );
};
