import { IMidiCommsContext, SYSEX_RESPONSES } from "@/consts";
import { MidiCommsContext } from "@/hooks/useMidiComms";
import { useMidiContext } from "@/hooks/useMidiContext";
import { useStateContext } from "@/hooks/useStateContext";
import {
  makeControllerPresetData,
  makeControllerPresetIdsRequestData,
  makeControllerPresetRequestData,
  makeRackLoopNamesData,
  makeRackLoopNamesRequestData,
  makeRackPresetData,
  makeRackPresetIdsRequestData,
  makeRackPresetRequestData,
  parseControllerPresetData,
  parsePresetIdsData,
  parseRackLoopNamesData,
  parseRackPresetData,
  parseResponse,
} from "@/lib/utils";
import React from "react";

export const MidiCommsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const midi = useMidiContext();
  const state = useStateContext();
  const send = React.useCallback(
    (data: number[]) => midi.output?.send(data),
    [midi.output]
  );
  React.useEffect(() => {
    if (!midi.input) {
      console.error("Midi input is null");
      return;
    }
    midi.input.onmidimessage = (event) => {
      if (!event.data) {
        console.error("Midi response is null");
        return;
      }
      const { type, response } = parseResponse(Array.from(event.data));
      switch (type) {
        case SYSEX_RESPONSES.RECEIVE_CONTROLLER_PRESET_STATE:
          state.setControllerState(parseControllerPresetData(response));
          break;
        case SYSEX_RESPONSES.RECEIVE_CONTROLLER_PRESET_IDS:
          state.setAllControllerPresetIds(parsePresetIdsData(response));
          break;
        case SYSEX_RESPONSES.RECEIVE_RACK_PRESET_STATE:
          state.setRackState(parseRackPresetData(response));
          break;
        case SYSEX_RESPONSES.RECEIVE_RACK_LOOP_NAMES:
          state.setRackLoopNames(parseRackLoopNamesData(response));
          break;
        case SYSEX_RESPONSES.RECEIVE_RACK_PRESET_IDS:
          state.setAllRackPresetIds(parsePresetIdsData(response));
          break;
      }
    };
  }, [midi.input, midi.input?.onmidimessage, state]);
  const context = React.useMemo<IMidiCommsContext>(
    () => ({
      requestControllerPreset: () => send(makeControllerPresetRequestData()),
      requestRackLoopNames: () => send(makeRackLoopNamesRequestData()),
      requestRackPreset: () => midi.output?.send(makeRackPresetRequestData()),
      requestControllerPresetIds: () =>
        midi.output?.send(makeControllerPresetIdsRequestData()),
      requestRackPresetIds: () =>
        midi.output?.send(makeRackPresetIdsRequestData()),
      sendControllerPreset: () =>
        send(makeControllerPresetData(state.getControllerState())),
      sendRackLoopNames: () =>
        send(makeRackLoopNamesData(state.getRackLoopNames())),
      sendRackPreset: () => send(makeRackPresetData(state.getRackState())),
      init: () => {
        context.requestControllerPreset();
        context.requestControllerPresetIds();
        context.requestRackPreset();
        context.requestRackPresetIds();
        context.requestRackLoopNames();
      },
    }),
    [midi.output, send, state]
  );
  return (
    <MidiCommsContext.Provider value={context}>
      {children}
    </MidiCommsContext.Provider>
  );
};
