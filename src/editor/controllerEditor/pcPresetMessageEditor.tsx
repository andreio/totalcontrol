import { NumberSelect } from "@/components/ui/numberSelect";
import { Switch } from "@/components/ui/switch";
import { IControllerMessageState, MsgType } from "@/consts";
import { useStateContext } from "@/hooks/useStateContext";

export const PCPresetMessageEditor = ({
  state,
  presetIndex,
}: {
  state: IControllerMessageState;
  presetIndex: number;
}) => {
  const { setControllerMessage: setMessage } = useStateContext();
  return (
    <div className="grid grid-cols-3 w-fit items-center gap-3 justify-start">
      <div className="flex flex-row gap-3 items-center">
        <span>PC Number:</span>
        <NumberSelect
          min={0}
          max={127}
          value={state.pcNumber?.toString()}
          onValueChange={(val) =>
            setMessage(presetIndex, {
              ...state,
              pcNumber: +val,
              type: MsgType.pc,
            })
          }
        ></NumberSelect>
      </div>
      <div className="flex flex-row items-center gap-3">
        <span>Send to all channels:</span>
        <Switch
          className="bg-slate-900"
          checked={state.omni}
          onCheckedChange={(val) =>
            setMessage(presetIndex, {
              ...state,
              omni: val,
              type: MsgType.pc,
            })
          }
        />
      </div>
      <div className="flex flex-row gap-3 items-center">
        <span>MIDI Channel:</span>
        <NumberSelect
          min={0}
          max={15}
          value={state.midiChannel?.toString()}
          onValueChange={(val) =>
            setMessage(presetIndex, {
              ...state,
              midiChannel: +val,
              type: MsgType.pc,
            })
          }
        ></NumberSelect>
      </div>
    </div>
  );
};
