import { RouterProvider } from "react-router-dom";

import { router } from "./routing/router-table";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider>
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
