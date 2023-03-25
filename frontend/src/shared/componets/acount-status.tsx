import { Group, Avatar, Text, Title, Button, ActionIcon } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../restapi/rest-api";
import { ILogOut, logIn, logOut } from "../hooks/jwt-log-status-hook";

const AcountStatus: React.FC = (props) => {
  const { data, isError, isLoading, isSuccess } = useQuery(
    "user",
    () => getUserInfo(),
    {
      onError: () => console.error("user info error"),
    }
  );
  const navigate = useNavigate();
  const { mutate, isError: isLoginError } = useMutation(async () => logOut(), {
    onError: (error) => {
      console.log(Error);
    },
    onSuccess: () => {
      navigate("../");
    },
  });

  if (isError) {
    return (
      <Group>
        <Text>User info not founded</Text>
      </Group>
    );
  }

  return (
    <>
      <Group p="md">
        <Avatar radius="xl" color="cyan"></Avatar>
        <div style={{ flex: 1 }}>
          <Title fz="lg">{isSuccess ? `${data.username}` : null}</Title>
          <Text fz="sm">{isSuccess ? `${data.email}` : null}</Text>
        </div>
        <Link to="../settings">
          <ActionIcon>
            <IconArrowRight />
          </ActionIcon>
        </Link>
      </Group>
      <Group p="md" position="left">
        {isSuccess && (
          <Button size="xs" onClick={() => mutate()} fz="sm">
            logout
          </Button>
        )}
      </Group>
    </>
  );
};

export { AcountStatus };
