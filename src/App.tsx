import "./App.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./components/ui/button";
import { useMidiContext } from "./hooks/useMidiContext";
import { PresetPage } from "./editor/presetPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { NumberSelect } from "./components/ui/numberSelect";
import { MonitorUpIcon } from "lucide-react";

const BUTTONS = ["A", "B", "C", "D", "E", "F", "G", "H"];

function App() {
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
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Control unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="totalControl">Control Unit</SelectItem>
              <SelectItem value="totalControlRack">Rack unit</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div></div>
      </div>
      <div className="flex flex-col items-center">
        <Tabs
          defaultValue="A"
          className="items-center flex flex-col w-[1200px]"
        >
          <div className="grid grid-cols-3 w-full">
            <div className="flex justify-start items-center gap-4">
              <span>Bank:</span>
              <NumberSelect min={0} max={127} />
            </div>
            <div className="flex flex-row justify-center">
              <TabsList className="grid w-fit grid-cols-4 grid-rows-2 h-30 items-center">
                {BUTTONS.map((preset) => (
                  <TabsTrigger
                    className="w-14 h-14 transition-colors duration-300"
                    key={`tab-${preset}`}
                    value={preset}
                  >
                    {preset}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="flex items-center justify-end">
              <Button>
                <MonitorUpIcon />
                Save
              </Button>
            </div>
          </div>

          {...BUTTONS.map((preset) => (
            <TabsContent
              key={`content-${preset}`}
              value={preset}
              className="w-full"
            >
              <PresetPage></PresetPage>
            </TabsContent>
          ))}
        </Tabs>
        <Button
          onClick={() => {
            const output = midiContext.midiAccess?.outputs.get("-1171954640");
            if (!output) {
              return;
            }
            output.send([240, 126, 127, 6, 1, 247]);
          }}
        >
          Test sysex
        </Button>
      </div>
    </>
  );
}

export default App;
