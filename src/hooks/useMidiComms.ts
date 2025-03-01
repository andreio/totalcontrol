import { IMidiCommsContext } from "@/consts";
import React from "react";

export const useMidiCommsContext = () => React.useContext(MidiCommsContext);
export const defaultContext: IMidiCommsContext = {
  requestControllerPreset() {},
  requestRackLoopNames() {},
  requestRackPreset() {},
  sendControllerPreset() {},
  sendRackLoopNames() {},
  sendRackPreset() {},
  requestControllerPresetIds() {},
  requestRackPresetIds() {},
  ping() {},
  requestFactoryReset() {},
  init() {
    return false;
  },
};

export const MidiCommsContext =
  React.createContext<IMidiCommsContext>(defaultContext);
