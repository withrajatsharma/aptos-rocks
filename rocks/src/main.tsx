import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "react-cookie";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";

const wallets = [new PetraWallet(), new PontemWallet()];
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      gcTime: 0,
      retry: false,
    },
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools position="top" buttonPosition="bottom-left" />
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className: "",
              style: {
                padding: "16px",
                color: "black",
                fontSize: "1rem",
                backgroundColor: "#333",
              },
            }}
          />
        </QueryClientProvider>
      </AptosWalletAdapterProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
