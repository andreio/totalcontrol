import { IMidiContext } from "@/consts";
import { defaultContext, MidiContext } from "@/hooks/useMidiContext";
import React from "react";

export const MidiProvider = ({ children }: React.PropsWithChildren) => {
  const [context, setContext] = React.useState<IMidiContext>(defaultContext);

  const requestMIDI = React.useCallback(
    () =>
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
        .catch((error) => {
          console.warn(error);
          setContext({
            error,
          });
        }),
    []
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (context.error || (context.input && context.output)) {
        if (context.error) {
          console.log(context.error);
        }
        clearInterval(interval);
        return;
      }
      console.log("Requesting MIDI...");
      requestMIDI();
    }, 500);

    return () => clearInterval(interval);
  }, [context, requestMIDI]);
  return (
    <MidiContext.Provider value={context}>{children}</MidiContext.Provider>
  );
};
