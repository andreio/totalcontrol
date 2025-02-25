import { EDITOR_PANE, IControllerMessageState } from "@/consts";
import { PresetSelector } from "../presetSelector";
import { useStateContext } from "@/hooks/useStateContext";

export const TCPCPresetMessageEditor = ({
  state,
}: {
  state: IControllerMessageState;
}) => {
  const { setControllerMessage: setMessage } = useStateContext();
  return (
    <div className="grid grid-cols-3 w-fit justify-start">
      <div>
        <span>Preset:</span>
        <PresetSelector
          pane={EDITOR_PANE.RACK}
          onPresetSelect={(rackBank, rackPreset) =>
            setMessage(state.index, { ...state, rackBank, rackPreset })
          }
          presetValue={[state.rackBank, state.rackPreset]}
        />
      </div>
    </div>
  );
};
