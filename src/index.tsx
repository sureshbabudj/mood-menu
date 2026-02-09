import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";

import "./styles.scss";
import { Toaster } from "./components/ui/toaster";
import ErrorBoundary from "./components/error-boundary";

const rootRender = async () => {
  const container = document.getElementById("root");
  try {
    const root = createRoot(container!);
    root.render(
      <StrictMode>
        <HelmetProvider>
          <ErrorBoundary>
            <App />
            <Toaster />
          </ErrorBoundary>
        </HelmetProvider>
      </StrictMode>
    );
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }
};

rootRender();
