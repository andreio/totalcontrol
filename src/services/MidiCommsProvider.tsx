import { IMidiCommsContext, SYSEX_RESPONSES } from "@/consts";
import { MidiCommsContext } from "@/hooks/useMidiComms";
import { useMidiContext } from "@/hooks/useMidiContext";
import { useStateContext } from "@/hooks/useStateContext";
import {
  makeControllerPresetData,
  makeControllerPresetIdsRequestData,
  makeControllerPresetRequestData,
  makeFactoryResetRequestData,
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
  pingRequest,
  waitChain,
} from "@/lib/utils";
import React from "react";

export const MidiCommsContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const initialized = React.useRef(false);
  const midi = useMidiContext();
  const state = useStateContext();
  const send = React.useCallback(
    (data: number[]) => {
      midi.output?.send(data);
    },
    [midi.output]
  );

  React.useEffect(() => {
    if (!midi.input) {
      console.warn("Midi input is null");
      return;
    }
    midi.input.onmidimessage = (event) => {
      if (!event.data) {
        console.warn("Midi response is null");
        return;
      }
      const { type, response, deviceId } = parseResponse(
        Array.from(event.data)
      );
      if (deviceId !== 23) {
        return;
      }
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
        case SYSEX_RESPONSES.PONG:
          break;
      }
    };
    return () => {
      if (!midi.input) {
        return;
      }
      midi.input.onmidimessage = null;
    };
  }, [midi, state]);
  const context = React.useMemo<IMidiCommsContext>(
    () => ({
      requestControllerPreset: (presetIndex: number) =>
        send(makeControllerPresetRequestData(presetIndex)),
      requestRackLoopNames: () => send(makeRackLoopNamesRequestData()),
      requestRackPreset: (presetIndex: number) => {
        send(makeRackPresetRequestData(presetIndex));
      },
      requestControllerPresetIds: () =>
        send(makeControllerPresetIdsRequestData()),
      requestRackPresetIds: () => send(makeRackPresetIdsRequestData()),
      sendControllerPreset: () =>
        send(makeControllerPresetData(state.getControllerState())),
      sendRackLoopNames: () =>
        send(makeRackLoopNamesData(state.getRackLoopNames())),
      sendRackPreset: () => send(makeRackPresetData(state.getRackState())),
      ping: () => {
        send(pingRequest());
      },
      requestFactoryReset: () => {
        send(makeFactoryResetRequestData());
      },
      init: () => {
        if (!midi.input || !midi.output || initialized.current) {
          return false;
        }
        initialized.current = true;
        waitChain(500)(context.requestControllerPreset.bind(context, 0))(
          context.requestControllerPresetIds
        )(context.requestRackPreset.bind(context, 0))(
          context.requestRackPresetIds
        )(context.requestRackLoopNames);
        return true;
      },
    }),
    [send, state, midi]
  );
  // React.useEffect(() => {
  //   const intervalHandle = setInterval(context.ping, 1000);
  //   return () => clearInterval(intervalHandle);
  // }, [context.ping]);
  return (
    <MidiCommsContext.Provider value={context}>
      {children}
    </MidiCommsContext.Provider>
  );
};
