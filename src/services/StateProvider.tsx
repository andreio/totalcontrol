import {
  DEFAULT_LOOP_NAMES,
  EMPTY_CONTROLLER_STATE,
  EMPTY_PRESET_IDS,
  EMPTY_RACK_STATE,
  IControllerState,
  IRackState,
  IStateContext,
} from "@/consts";
import { StateContext } from "@/hooks/useStateContext";
import React from "react";

export const StateProvider = ({ children }: React.PropsWithChildren) => {
  const [controllerState, setControllerState] =
    React.useState<IControllerState>(EMPTY_CONTROLLER_STATE);
  const [rackState, setRackState] =
    React.useState<IRackState>(EMPTY_RACK_STATE);
  const [controllerPresetIds, setControllerPresetIds] =
    React.useState(EMPTY_PRESET_IDS);
  const [rackLoopNames, setRackLoopNames] = React.useState(DEFAULT_LOOP_NAMES);
  const [rackPresetIds, setRackPresetIds] = React.useState(EMPTY_PRESET_IDS);
  const context = React.useMemo<IStateContext>(() => {
    return {
      getControllerState() {
        return controllerState;
      },
      getAllControllerPresetIds() {
        return controllerPresetIds;
      },
      setControllerState(state) {
        setControllerState(state);
      },
      setControllerCurrent(bank, program) {
        console.log("setCurrent", bank, program);
        setControllerState({ ...EMPTY_CONTROLLER_STATE, bank, program });
      },
      setControllerPresetName(name) {
        setControllerState({ ...controllerState, name });
        console.log("setName", name);
      },
      setControllerTogglePresetName(toggleName) {
        setControllerState({ ...controllerState, toggleName });
        console.log("setToggleName", toggleName);
      },
      setControllerBankName(bankName) {
        setControllerState({ ...controllerState, bankName });
        console.log("setToggleName", bankName);
      },
      setControllerMessage(index, messageState) {
        const messages = controllerState.messages.slice();
        messages[index] = messageState;
        setControllerState({ ...controllerState, messages });
        console.log("setMessage", index, messageState);
      },
      setAllControllerPresetIds(presetIds) {
        setControllerPresetIds(presetIds);
      },
      getRackState() {
        return rackState;
      },
      getAllRackPresetIds() {
        return rackPresetIds;
      },
      setRackState(state) {
        setRackState(state);
      },
      setRackCurrent(bank, program) {
        setRackState({
          ...EMPTY_RACK_STATE,
          bank,
          program,
        });
      },
      setRackLoopNames(loopNames) {
        setRackLoopNames(loopNames);
      },
      getRackLoopNames() {
        return rackLoopNames;
      },
      setRackPresetLoops(loops) {
        setRackState({ ...rackState, loops });
      },
      setRackPresetName(name) {
        setRackState({ ...rackState, name });
      },
      setRackBankName(bankName) {
        setRackState({ ...rackState, bankName });
      },
      setAllRackPresetIds(presetIds) {
        setRackPresetIds(presetIds);
      },
    };
  }, [
    controllerPresetIds,
    controllerState,
    rackLoopNames,
    rackPresetIds,
    rackState,
  ]);
  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};
