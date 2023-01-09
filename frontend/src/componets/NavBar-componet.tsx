import {
  Group,
  Navbar as MantineNavbar,
  TextInput,
  Button,
  Avatar,
  Text,
  NavLink
} from "@mantine/core";

const SearchBar: React.FC = (props: any) => {
  return (
    <>
      <TextInput placeholder="Search" />
      <Button>Search</Button>
    </>
  );
};

const Navbar: React.FC = (props) => {
  return (
    <MantineNavbar height={120} p="xs">
      <Group position="left">
        <User />
      </Group>
      <Group position="right">
        <SearchBar />
      </Group>
    </MantineNavbar>
  );
};

const User: React.FC = (props) => {
  return (
    <Group>
      <Avatar radius="xl" color="cyan"></Avatar>

      <div style={{ flex: 1 }}>
        <Text size="sm" weight={500}>
          username
        </Text>

        <Text color="dimmed" size="xs">
          email
        </Text>
      </div>
    </Group>
  );
};

export { Navbar };
