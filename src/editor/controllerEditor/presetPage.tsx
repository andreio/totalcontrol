import { Input } from "@/components/ui/input";
import { PresetMessage } from "./presetMessage";
import { useStateContext } from "@/hooks/useStateContext";
export const PresetPage = () => {
  const state = useStateContext();
  const currentState = state.getControllerState();
  return (
    <div>
      <div className="p-3 flex gap-3 bg-slate-800 rounded-sm my-3 items-center">
        <span>Short Name:</span>
        <Input
          type="text"
          className="bg-slate-900 w-40"
          placeholder="Name..."
          value={currentState.name}
          maxLength={8}
          onChange={({ target: { value } }) =>
            state.setControllerPresetName(value)
          }
        ></Input>
        <span>Toggle Name:</span>
        <Input
          type="text"
          className="bg-slate-900 w-40"
          placeholder="Toggle name..."
          value={currentState.toggleName}
          onChange={({ target: { value } }) =>
            state.setControllerTogglePresetName(value)
          }
          maxLength={8}
        ></Input>
        <span>Bank Name:</span>
        <Input
          type="text"
          className="bg-slate-900 w-40"
          placeholder="Bank name..."
          value={currentState.bankName}
          onChange={({ target: { value } }) =>
            state.setControllerBankName(value)
          }
          maxLength={8}
        ></Input>
      </div>
      {Array.from({ length: 8 }).map((_, index) => {
        return <PresetMessage key={index} index={index} />;
      })}
    </div>
  );
};
