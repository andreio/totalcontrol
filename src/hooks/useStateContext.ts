import {
  EMPTY_CONTROLLER_STATE,
  EMPTY_PRESET_IDS,
  EMPTY_RACK_STATE,
  IStateContext,
} from "@/consts";
import React from "react";

export const useStateContext = () => React.useContext(StateContext);

export const defaultContext: IStateContext = {
  getControllerState() {
    return EMPTY_CONTROLLER_STATE;
  },
  setControllerCurrent() {},
  setControllerMessage() {},
  setControllerPresetName() {},
  setControllerTogglePresetName() {},
  setControllerState() {},
  setRackState() {},
  getRackState() {
    return EMPTY_RACK_STATE;
  },
  setRackCurrent() {},
  setRackPresetName() {},
  setRackPresetLoops() {},
  getAllControllerPresetIds() {
    return EMPTY_PRESET_IDS;
  },
  getAllRackPresetIds() {
    return EMPTY_PRESET_IDS;
  },
  setAllControllerPresetIds() {},
  setAllRackPresetIds() {},
  setControllerBankName() {},
  setRackLoopsNames() {},
  setRackBankName() {},
};

export const StateContext = React.createContext<IStateContext>(defaultContext);
