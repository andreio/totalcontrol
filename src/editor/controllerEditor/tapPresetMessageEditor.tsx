import { NumberSelect } from "@/components/ui/numberSelect";
import { IControllerMessageState } from "@/consts";
import { useStateContext } from "@/hooks/useStateContext";

export const TapPresetMessageEditor = ({
  state,
  presetIndex,
}: {
  state: IControllerMessageState;
  presetIndex: number;
}) => {
  const { setControllerMessage: setMessage } = useStateContext();

  return (
    <div className="grid grid-cols-3 w-fit gap-3 items-center justify-start">
      <div className="flex flex-row items-center gap-3">
        <span>CC Number:</span>
        <NumberSelect
          min={0}
          max={127}
          onValueChange={(val) =>
            setMessage(presetIndex, {
              ...state,
              ccNumber: +val,
            })
          }
          value={state.ccNumber.toString()}
        ></NumberSelect>
      </div>
      <div className="flex flex-row items-center gap-3">
        <span>MIDI Channel:</span>
        <NumberSelect
          min={0}
          max={15}
          onValueChange={(val) =>
            setMessage(presetIndex, {
              ...state,
              midiChannel: +val,
            })
          }
          value={state.midiChannel.toString()}
        ></NumberSelect>
      </div>
    </div>
  );
};
