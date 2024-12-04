import { NumberSelect } from "@/components/ui/numberSelect";

export const CCPresetMessageEditor = () => {
  return (
    <div className="grid grid-cols-3 w-fit gap-3 items-center justify-start">
      <div className="flex flex-row items-center gap-3">
        <span>CC Number:</span>
        <NumberSelect min={0} max={127}></NumberSelect>
      </div>
      <div className="flex flex-row items-center gap-3">
        <span>CC Value:</span>
        <NumberSelect min={0} max={127}></NumberSelect>
      </div>
      <div className="flex flex-row items-center gap-3">
        <span>MIDI Channel:</span>
        <NumberSelect min={1} max={16}></NumberSelect>
      </div>
    </div>
  );
};
