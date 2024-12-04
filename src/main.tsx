import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MidiProvider } from "./editor/MidiProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MidiProvider>
      <App />
    </MidiProvider>
  </StrictMode>
);
