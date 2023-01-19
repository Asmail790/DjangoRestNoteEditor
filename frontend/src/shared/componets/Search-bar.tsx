import { TextInput, Button } from "@mantine/core";


const SearchBar: React.FC = (props: any) => {
    return (
      <>
        <TextInput placeholder="Search" />
        <Button>Search</Button>
      </>
    );
  };

export {SearchBar}