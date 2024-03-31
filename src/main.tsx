import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import theme from "./theme/theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <Router>
      <React.StrictMode>
        <ColorModeScript />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <App />
        </QueryClientProvider>
      </React.StrictMode>
    </Router>
  </ChakraProvider>
);
