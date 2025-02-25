import { SYSEX_COMMANDS, SYSEX_START, SYSEX_STOP } from "@/consts";
import { useMidiContext } from "./useMidiContext";
import { useStateContext } from "./useStateContext";
import React from "react";

export const useSendPresetState = () => {
  const state = useStateContext().getControllerState();
  const midi = useMidiContext();
  console.log(state.messages);
  return React.useCallback(() => {
    const data = [
      SYSEX_START,
      23,
      SYSEX_COMMANDS.SEND_PRESET_STATE,
      state.bank,
      state.program,
      ...Array.from(state.name.padEnd(8, " ")).map((x) => x.charCodeAt(0)),
      ...Array.from(state.toggleName.padEnd(8, " ")).map((x) =>
        x.charCodeAt(0)
      ),
      ...state.messages
        .map(
          ({
            index,
            type,
            action,
            ccNumber,
            pcNumber,
            ccValue,
            midiChannel,
            omni,
          }) => [
            index,
            type,
            action,
            ccNumber,
            pcNumber,
            ccValue,
            midiChannel,
            +omni,
          ]
        )
        .flat(1),
      SYSEX_STOP,
    ];
    console.log(data);
    midi.output?.send(data);
  }, [
    midi.output,
    state.bank,
    state.messages,
    state.name,
    state.program,
    state.toggleName,
  ]);
};
