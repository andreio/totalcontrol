import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IControllerMessageState,
  LoopToggle,
  LoopToggleToText,
  RACK_CHANNELS,
  RACK_LOOPS,
} from "@/consts";
import { useStateContext } from "@/hooks/useStateContext";

export const TCCCPresetMessageEditor = ({
  state,
}: {
  state: IControllerMessageState;
}) => {
  const { setControllerMessage } = useStateContext();

  return (
    <div className="grid grid-cols-5 gap-3">
      {Array.from({ length: RACK_LOOPS }).map((_, index) => (
        <div className="flex flex-col gap-3 w-60" key={`loop-${index}`}>
          <span>Loop {index + 1}</span>
          <Select
            value={state.loops[index].toString()}
            onValueChange={(toggle) => {
              const loops = [...state.loops];
              loops[index] = +toggle;
              setControllerMessage(state.index, {
                ...state,
                loops,
              });
            }}
          >
            <SelectTrigger className="bg-slate-900">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={LoopToggle.unchanged.toString()}>
                {LoopToggleToText[LoopToggle.unchanged]}
              </SelectItem>
              <SelectItem value={LoopToggle.set.toString()}>
                {LoopToggleToText[LoopToggle.set]}
              </SelectItem>
              <SelectItem value={LoopToggle.unset.toString()}>
                {LoopToggleToText[LoopToggle.unset]}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
      {Array.from({ length: RACK_CHANNELS }).map((_, index) => (
        <div className="flex flex-col gap-3 w-60" key={`channel-${index}`}>
          <span>Channel {index + 1}</span>
          <Select
            value={state.loops[RACK_LOOPS + index].toString()}
            onValueChange={(toggle) => {
              const loops = [...state.loops];
              loops[RACK_LOOPS + index] = +toggle;
              setControllerMessage(state.index, {
                ...state,
                loops,
              });
            }}
          >
            <SelectTrigger className="bg-slate-900">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={LoopToggle.unchanged.toString()}>
                {LoopToggleToText[LoopToggle.unchanged]}
              </SelectItem>
              <SelectItem value={LoopToggle.set.toString()}>
                {" "}
                {LoopToggleToText[LoopToggle.set]}
              </SelectItem>
              <SelectItem value={LoopToggle.unset.toString()}>
                {LoopToggleToText[LoopToggle.unset]}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};
