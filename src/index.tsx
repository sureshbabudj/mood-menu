import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import "./styles.scss";
import { Toaster } from "./components/ui/toaster";

const rootRender = async () => {
  const container = document.getElementById("root");
  try {
    const root = createRoot(container!);
    root.render(
      <StrictMode>
        <App />
        <Toaster />
      </StrictMode>
    );
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }
};

rootRender();
