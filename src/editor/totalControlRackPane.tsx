import { EDITOR_PANE } from "@/consts";
import { PresetSelector } from "./presetSelector";
import { LoopNamesEditor } from "./rackEditor/loopNamesEditor";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStateContext } from "@/hooks/useStateContext";
import { RackPresetEditor } from "./rackEditor/rackPresetEditor";

export const TotalControlRackPane = () => {
  const state = useStateContext();
  const currentState = state.getRackState();

  return (
    <div className="flex flex-col w-[1200px] gap-3 p-3">
      <Collapsible className="mb-3">
        <CollapsibleTrigger className="flex flex-row content-end">
          <Button variant="secondary">
            Edit loop names <Edit2 />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <LoopNamesEditor />
        </CollapsibleContent>
      </Collapsible>
      <div className="flex justify-start items-center gap-4">
        <span>Presets:</span>
        <PresetSelector pane={EDITOR_PANE.RACK} />
      </div>
      <div className="p-3 flex flex-col gap-3 bg-slate-800 rounded-sm my-3">
        <div className="flex gap-3 bg-slate-800 rounded-sm  items-center">
          <span>Name:</span>
          <Input
            type="text"
            className="bg-slate-900 w-40"
            placeholder="Name..."
            value={currentState.name}
            maxLength={8}
            onChange={({ target: { value } }) => state.setRackPresetName(value)}
          ></Input>
          <span>Bank Name:</span>
          <Input
            type="text"
            className="bg-slate-900 w-40"
            placeholder="Bank name..."
            value={currentState.bankName}
            onChange={({ target: { value } }) => state.setRackBankName(value)}
            maxLength={8}
          ></Input>
        </div>
      </div>
      <RackPresetEditor />
    </div>
  );
};
