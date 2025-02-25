import { Button } from "@/components/ui/button";
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
import { MonitorUpIcon } from "lucide-react";

export const RackPresetEditor = () => {
  const state = useStateContext();
  const currentState = state.getRackState();
  return (
    <div className=" bg-slate-600 p-3 w-full">
      <div className="grid grid-cols-5 gap-3 justify-center">
        {Array.from({ length: RACK_LOOPS }).map((_, index) => (
          <div className="flex flex-col gap-3 w-60" key={`loop-${index}`}>
            <span>Loop {index + 1}</span>
            <Select value={currentState.loops[index].toString()}>
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
            <span>Channel {index + 1}</span>
            <Select value={currentState.loops[index + RACK_LOOPS].toString()}>
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
        <div className="flex gap-3 w-60 items-end">
          <Button>
            <MonitorUpIcon />
            Save Preset
          </Button>
        </div>
      </div>
    </div>
  );
};
