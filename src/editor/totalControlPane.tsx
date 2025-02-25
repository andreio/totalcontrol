import { Button } from "@/components/ui/button";
import { MonitorUpIcon } from "lucide-react";
import { PresetPage } from "./controllerEditor/presetPage";
import { useMidiCommsContext } from "@/hooks/useMidiComms";
import { useStateContext } from "@/hooks/useStateContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BUTTON_LABELS, EDITOR_PANE } from "@/consts";
import { PresetSelector } from "./presetSelector";

export const TotalControlPane = () => {
  const state = useStateContext();
  const { sendRackPreset } = useMidiCommsContext();

  return (
    <Tabs
      defaultValue="A"
      className="items-center flex flex-col w-[1200px]"
      value={BUTTON_LABELS[state.getControllerState().program]}
      onValueChange={(val) =>
        state.setControllerCurrent(
          state.getControllerState().bank,
          val.charCodeAt(0) - 65
        )
      }
    >
      <div className="grid grid-cols-3 w-full">
        <div className="flex justify-start items-center gap-4">
          <span>Presets:</span>
          <PresetSelector pane={EDITOR_PANE.CONTROL} />
        </div>
        <div className="flex flex-row justify-center">
          <TabsList className="grid w-fit grid-cols-4 grid-rows-2 h-30 items-center">
            {BUTTON_LABELS.map((preset) => (
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
          <Button onClick={sendRackPreset}>
            <MonitorUpIcon />
            Save
          </Button>
        </div>
        {/* <div>State: {JSON.stringify(state.get())}</div> */}
      </div>

      {...BUTTON_LABELS.map((preset) => (
        <TabsContent
          key={`content-${preset}`}
          value={preset}
          className="w-full"
        >
          <PresetPage key={preset} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
