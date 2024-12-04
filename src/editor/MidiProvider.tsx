import React from "react";

export type IMidiContext = {
  midiAccess?: MIDIAccess;
  error?: string;
};

const defaultContext: IMidiContext = {};

export const MidiContext = React.createContext<IMidiContext>(defaultContext);

export const MidiProvider = ({ children }: React.PropsWithChildren) => {
  const [context, setContext] = React.useState<IMidiContext>(defaultContext);
  React.useEffect(() => {
    navigator
      .requestMIDIAccess({
        sysex: true,
        software: true,
      })
      .then((midiAccess) =>
        setContext({
          midiAccess,
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
