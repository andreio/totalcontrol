import { PresetMessage } from "./presetMessage";
export const PresetPage = () => {
  return (
    <div>
      <div className="p-3 flex gap-3 bg-slate-800 rounded-sm my-3">
        <span>Short Name:</span>
        <input></input>
        <span>Toggle Name:</span>
        <input></input>
      </div>
      {Array.from({ length: 8 }).map((_, index) => {
        return <PresetMessage key={index} index={index} />;
      })}
    </div>
  );
};
