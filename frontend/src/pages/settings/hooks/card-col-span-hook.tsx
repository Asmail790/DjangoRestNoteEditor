import { useLocalStorage } from "@mantine/hooks";

function useColSpan() {
  const [ColumnSpanIndex, setColumnSpanIndex] = useLocalStorage<number>({
    key: "grid-columns-index",
    defaultValue: 2,
  });

  const cardColSpan = [20, 25, 50, 100];
  const columns = 100;
  const numberOfCardPerRow = columns / cardColSpan[ColumnSpanIndex];

  return {
    ColumnSpanIndex,
    setColumnSpanIndex,
    cardColSpan,
    numberOfCardPerRow,
    columns,
  };
}

export { useColSpan };
