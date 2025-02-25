import "./App.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import React from "react";
import { TotalControlPane } from "./editor/totalControlPane";
import { TotalControlRackPane } from "./editor/totalControlRackPane";
import { EDITOR_PANE } from "./consts";
import { useMidiContext } from "./hooks/useMidiContext";
import { Circle } from "lucide-react";

function App() {
  const [pane, selectPane] = React.useState<string>(EDITOR_PANE.CONTROL);
  const midiContext = useMidiContext();
  return (
    <>
      <div className="flex flex-row items-center w-full mb-9 bg-slate-800 p-3">
        <img
          src="Logo2.png"
          className="w-48 rounded-sm fixed left-0 bottom-0"
        />
        <div className="flex justify-start items-center gap-3 m-auto">
          <span>Editor: </span>
          <Select value={pane} onValueChange={selectPane}>
            <SelectTrigger>
              <SelectValue placeholder="Control unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EDITOR_PANE.CONTROL}>Control Unit</SelectItem>
              <SelectItem value={EDITOR_PANE.RACK}>Rack unit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-end gap-3 absolute">
          Connection <Circle fill={midiContext.output ? "green" : ""} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        {pane === EDITOR_PANE.CONTROL && <TotalControlPane />}
        {pane === EDITOR_PANE.RACK && <TotalControlRackPane />}
      </div>
    </>
  );
}

export default App;
