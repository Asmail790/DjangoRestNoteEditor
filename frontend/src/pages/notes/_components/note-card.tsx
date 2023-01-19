import { Card, Image, Text, Button, Group, Grid } from "@mantine/core";
import { PropsWithChildren } from "react";
import { NoteDataWithID } from "../../../shared/types";

type Link = { label: string; link: string };
type Links = { links: Link[] };

type NoteCardProp = PropsWithChildren<NoteDataWithID & Links>;

const NoteCard: React.FC<NoteCardProp> = (props) => {
  return (
    <Grid.Col key={props.id} span={3}>
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Text weight={500}> {props.title}</Text>

        <Text size="sm" color="dimmed">
          {props.text}
        </Text>
        <Group>
          {props.links.map(({ label, link }) => (
            <Button variant="light" color="blue" mt="md" radius="md">
              {label}
            </Button>
          ))}
        </Group>
      </Card>
    </Grid.Col>
  );
};

export { NoteCard };
