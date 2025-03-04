import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RACK_LOOPS,
  LoopToggle,
  LoopToggleToText,
  RACK_CHANNELS,
} from "@/consts";
import { useStateContext } from "@/hooks/useStateContext";

export const RackPresetEditor = () => {
  const state = useStateContext();
  const currentState = state.getRackState();
  return (
    <div className=" bg-slate-600 p-3 w-full">
      <div className="grid grid-cols-5 gap-3 justify-center">
        {Array.from({ length: RACK_LOOPS }).map((_, index) => (
          <div className="flex flex-col gap-3 w-60" key={`loop-${index}`}>
            <span>{state.getRackLoopNames()[index]}</span>
            <Select
              value={currentState.loops[index].toString()}
              onValueChange={(val) => {
                const loops = currentState.loops.slice(0);
                loops[index] = +val;
                state.setRackPresetLoops(loops);
              }}
            >
              <SelectTrigger className="bg-slate-900">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
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
            <span>{state.getRackLoopNames()[RACK_LOOPS + index]}</span>
            <Select
              value={currentState.loops[index + RACK_LOOPS].toString()}
              onValueChange={(val) => {
                const loops = currentState.loops.slice(0);
                loops[index + RACK_LOOPS] = +val;
                state.setRackPresetLoops(loops);
              }}
            >
              <SelectTrigger className="bg-slate-900">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
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
      </div>
    </div>
  );
};
