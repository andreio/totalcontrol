import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MidiProvider } from "./services/MidiProvider.tsx";
import { StateProvider } from "./services/StateProvider.tsx";
import { MidiCommsContextProvider } from "./services/MidiCommsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MidiProvider>
      <StateProvider>
        <MidiCommsContextProvider>
          <App />
        </MidiCommsContextProvider>
      </StateProvider>
    </MidiProvider>
  </StrictMode>
);
