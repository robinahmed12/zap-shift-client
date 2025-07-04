import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import "leaflet/dist/leaflet.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
