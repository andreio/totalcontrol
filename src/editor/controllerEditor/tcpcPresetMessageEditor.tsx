import { EDITOR_PANE, IControllerMessageState } from "@/consts";
import { PresetSelector } from "../presetSelector";
import { useStateContext } from "@/hooks/useStateContext";

export const TCPCPresetMessageEditor = ({
  state,
  presetIndex,
}: {
  state: IControllerMessageState;
  presetIndex: number;
}) => {
  const { setControllerMessage: setMessage } = useStateContext();
  return (
    <div className="grid grid-cols-3 w-fit justify-start ">
      <div>
        <span>Preset:</span>
        <PresetSelector
          pane={EDITOR_PANE.RACK}
          onPresetSelect={(index) =>
            setMessage(presetIndex, { ...state, rackPreset: index })
          }
          presetIndex={presetIndex}
        />
      </div>
    </div>
  );
};
