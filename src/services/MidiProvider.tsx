import { IMidiContext } from "@/consts";
import { defaultContext, MidiContext } from "@/hooks/useMidiContext";
import React from "react";

export const MidiProvider = ({ children }: React.PropsWithChildren) => {
  const [context, setContext] = React.useState<IMidiContext>(defaultContext);

  React.useEffect(() => {
    navigator
      .requestMIDIAccess({
        sysex: true,
        software: true,
      })
      .then(({ inputs, outputs }) =>
        setContext({
          input: Array.from(inputs.values()).find(
            ({ name }) => name?.toLowerCase() === "total control"
          ),
          output: Array.from(outputs.values()).find(
            ({ name }) => name?.toLowerCase() === "total control"
          ),
        })
      )
      .catch((error) =>
        setContext({
          error,
        })
      );
  }, []);
  console.log(context);
  return (
    <MidiContext.Provider value={context}>{children}</MidiContext.Provider>
  );
};
