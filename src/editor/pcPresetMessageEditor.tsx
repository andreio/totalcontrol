import { NumberSelect } from "@/components/ui/numberSelect";
import { Switch } from "@/components/ui/switch";

export const PCPresetMessageEditor = () => {
  return (
    <div className="grid grid-cols-3 w-fit items-center gap-3 justify-start">
      <div className="flex flex-row gap-3 items-center">
        <span>PC Number:</span>
        <NumberSelect min={0} max={127}></NumberSelect>
      </div>
      <div className="flex flex-row items-center gap-3">
        <span>Send to all channels:</span>
        <Switch className="bg-slate-900" />
      </div>
      <div className="flex flex-row gap-3 items-center">
        <span>MIDI Channel:</span>
        <NumberSelect min={1} max={16}></NumberSelect>
      </div>
    </div>
  );
};
