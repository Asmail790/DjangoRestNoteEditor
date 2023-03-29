import { Box, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import { CreateAccountForm } from "./create-account-form";
import { VerifyEmail } from "./verify-email";
import { useCreateForm } from "../hooks/create-form-hook";
import { Mutation } from "react-query";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import { ConfirmAccountCredentials } from "./confirm-account-credentials";
import { CreateAccountArgs } from "../../../restapi/rest-api";
import { createContext } from "vm";
import { CompletedMessage } from "./completed-message";

export type RegistrationStepProps = {
  nextStep: () => void;
  prevStep: () => void;
};

export type accountCredintalsProps = CreateAccountArgs;

export function RegistrationStepper() {
  const [accountCredintals, setAccountCredintals] = useState<
    accountCredintalsProps | undefined
  >();

  const [active, setActive] = useState(0);

  function nextStep() {
    setActive((current) => (current < 3 ? current + 1 : current));
  }

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const props = { nextStep, prevStep };

  return (
    <Stack>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step
          label="Account credentials"
          description="Fill Account credentials"
        >
          <CreateAccountForm {...{ ...props, setAccountCredintals }} />
        </Stepper.Step>

        <Stepper.Step label="Confirm" description="Confirm account credentials">
          <ConfirmAccountCredentials {...props} />
        </Stepper.Step>
        <Stepper.Step label="Activate account" description="Verify your email">
          <VerifyEmail {...{ ...props, accountCredintals }} />
        </Stepper.Step>
        <Stepper.Completed>
          <CompletedMessage {...{ ...props, accountCredintals }} />
        </Stepper.Completed>
      </Stepper>
    </Stack>
  );
}
