import { Input } from "@/components/ui/input";
import { PresetMessage } from "./presetMessage";
export const PresetPage = () => {
  return (
    <div>
      <div className="p-3 flex gap-3 bg-slate-800 rounded-sm my-3 items-center">
        <span>Short Name:</span>
        <Input
          className="bg-slate-900 w-40"
          placeholder="Short name..."
        ></Input>
        <span>Toggle Name:</span>
        <Input
          className="bg-slate-900 w-40"
          placeholder="Toggle name..."
        ></Input>
      </div>
      {Array.from({ length: 8 }).map((_, index) => {
        return <PresetMessage key={index} index={index} />;
      })}
    </div>
  );
};
