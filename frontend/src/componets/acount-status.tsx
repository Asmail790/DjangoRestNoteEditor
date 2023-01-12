
import {Group, Avatar,Text} from "@mantine/core"


const AcountStatus: React.FC = (props) => {
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

  export {AcountStatus}