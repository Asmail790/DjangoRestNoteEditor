import { Center, Pagination as MantinePagination } from "@mantine/core";
import { FC } from "react";
type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = (props) => {
  return (
    <Center>
      <MantinePagination
        boundaries={1}
        page={props.page}
        siblings={1}
        onChange={props.onChange}
        total={props.totalPages}
      />
    </Center>
  );
};

export { Pagination };
