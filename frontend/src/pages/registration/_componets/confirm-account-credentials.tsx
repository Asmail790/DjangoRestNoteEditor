import { Box, Button, Group, Title, Text } from "@mantine/core";
import { FC } from "react";
import { RegistrationStepProps } from "./registration-stepper";

export type ConfirmAccountCredentialsProps = RegistrationStepProps;

export const ConfirmAccountCredentials: FC<ConfirmAccountCredentialsProps> = (
  props
) => {
  const { nextStep, prevStep } = props;
  return (
    <>
      <Box>
        <Title order={1} align="center">
          Confirm your account credentials.
        </Title>
        <Text align="center">
          You will not be able change your account credentials until your
          account is activated.
        </Text>
      </Box>
      <Group position="center" mt="xl">
        <Button onClick={prevStep}>Redit</Button> {/* arrow left */}
        <Button onClick={nextStep}>Confirm</Button> {/* arrow right */}
      </Group>
    </>
  );
};
