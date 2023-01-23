import { Card, Image, Text, Button, Group, Grid } from "@mantine/core";
import { PropsWithChildren } from "react";
import { NoteDataWithID } from "../../../shared/types";
import { exampleImage } from "../../../shared/temporary replacement ";

type Link = { label: string; link: string };
type Links = { links: Link[] };

type NoteCardProp = PropsWithChildren<NoteDataWithID & Links>;

const NoteCard: React.FC<NoteCardProp> = (props) => {
  return (
    <Grid.Col sm={12} md={4} >
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Card.Section>
          <Image
            src={exampleImage.src}
            height={exampleImage.height}
            alt={exampleImage.alt}
          />
        </Card.Section>

        <Text weight={500}> {props.title}</Text>

        <Text size="sm" color="dimmed">
          {props.text}
        </Text>
        <Group>
          {props.links.map(({ label, link },index:number) => (
            <Button variant="light" key={index} color="blue" mt="md" radius="md">
              {label}
            </Button>
          ))}
        </Group>
      </Card>
    </Grid.Col>
  );
};

export { NoteCard };
