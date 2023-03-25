import { RouterProvider } from "react-router-dom";

import { router } from "./routing/router-table";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineTheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { MantineThemes } from "./shared/types";

function App() {
  const queryClient = new QueryClient();
  const [value, setValue] = useLocalStorage<MantineThemes>({
    key: "color-scheme",
    defaultValue: "light",
  });

  const [theme, setTheme] = useState<MantineThemes>(value);
  useEffect(() => setTheme(value), [value]);

  return (
    <MantineProvider theme={{ colorScheme: theme }} withNormalizeCSS>
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
