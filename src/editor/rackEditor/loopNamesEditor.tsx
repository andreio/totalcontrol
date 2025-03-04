import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RACK_CHANNELS, RACK_LOOPS } from "@/consts";
import { useMidiCommsContext } from "@/hooks/useMidiComms";
import { useStateContext } from "@/hooks/useStateContext";
import { MonitorUpIcon } from "lucide-react";

export const LoopNamesEditor = () => {
  const { sendRackLoopNames } = useMidiCommsContext();
  const { getRackLoopNames, setRackLoopNames } = useStateContext();

  return (
    <div className="p-3 grid grid-cols-5 gap-3 bg-slate-800 rounded-sm my-3 items-end align-middle ">
      {Array.from({ length: RACK_LOOPS }).map((_, index) => (
        <div className="flex flex-col gap-3 w-60" key={`loop-${index}`}>
          <span>Loop {index + 1}</span>
          <Input
            className="bg-slate-900 w-40"
            placeholder={`Loop ${index + 1}`}
            value={getRackLoopNames()[index]}
            onChange={({ target: { value } }) => {
              const loopNames = getRackLoopNames().slice();
              loopNames[index] = value;
              setRackLoopNames(loopNames);
            }}
          />
        </div>
      ))}
      {Array.from({ length: RACK_CHANNELS }).map((_, index) => (
        <div className="flex flex-col gap-3 w-60" key={`channel-${index}`}>
          <span>Channel {index + 1}</span>
          <Input
            className="bg-slate-900 w-40"
            placeholder={`Channel ${index + 1}`}
            value={getRackLoopNames()[RACK_LOOPS + index]}
            onChange={({ target: { value } }) => {
              const loopNames = getRackLoopNames().slice();
              loopNames[RACK_LOOPS + index] = value;
              setRackLoopNames(loopNames);
            }}
          />
        </div>
      ))}
      <div className="flex flex-col gap-3 w-40">
        <Button onClick={sendRackLoopNames}>
          <MonitorUpIcon />
          Save names
        </Button>
      </div>
    </div>
  );
};
