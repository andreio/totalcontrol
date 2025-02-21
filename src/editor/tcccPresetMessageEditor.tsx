import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LoopToggle, LoopToggleToText } from "@/consts";
import React from "react";

const loops = 7;
const channels = 2;

export const TCCCPresetMessageEditor = () => {
  const [toggleState, setToggleState] = React.useState<string[]>(
    [
      LoopToggle.unchanged,
      LoopToggle.unchanged,
      LoopToggle.unchanged,
      LoopToggle.unchanged,
      LoopToggle.unchanged,
      LoopToggle.unchanged,
      LoopToggle.unchanged,
      LoopToggle.unchanged,
      LoopToggle.unchanged,
    ].map((x) => x.toString())
  );
  return (
    <div className="grid grid-cols-5 gap-3">
      {Array.from({ length: loops }).map((_, index) => (
        <div className="flex flex-col gap-3 w-60" key={`loop-${index}`}>
          <span>Loop {index + 1}</span>
          <Select
            value={toggleState[index]}
            onValueChange={(toggle) =>
              setToggleState((state) => {
                const newState = [...state];
                newState[index] = toggle;
                return newState;
              })
            }
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
      {Array.from({ length: channels }).map((_, index) => (
        <div className="flex flex-col gap-3 w-60" key={`channel-${index}`}>
          <span>Channel {index + 1}</span>
          <Select
            value={toggleState[loops + index]}
            onValueChange={(toggle) =>
              setToggleState((state) => {
                const newState = [...state];
                newState[loops + index] = toggle;
                return newState;
              })
            }
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
