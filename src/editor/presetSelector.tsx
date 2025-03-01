import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BUTTON_LABELS,
  EDITOR_PANE,
  PresetId,
  PRESETS_TO_BANK,
} from "@/consts";
import { useMidiCommsContext } from "@/hooks/useMidiComms";
import { useStateContext } from "@/hooks/useStateContext";
import React from "react";

export const PresetSelector = ({
  pane,
  onPresetSelect,
  presetIndex,
}: {
  pane: EDITOR_PANE;
  onPresetSelect?: (presetIndex: number) => void;
  presetIndex?: number;
}) => {
  const state = useStateContext();
  const { requestControllerPreset, requestRackPreset } = useMidiCommsContext();
  const { groupedPresets, onSelect, selectedValue } = React.useMemo(() => {
    const controllerState = state.getControllerState();
    const rackState = state.getRackState();

    const groupedPresets: PresetId[][] = [];
    const presets = (
      pane === EDITOR_PANE.CONTROL
        ? state.getAllControllerPresetIds()
        : state.getAllRackPresetIds()
    ).slice(0);

    let groupsLeft = presets.length / PRESETS_TO_BANK;
    while (groupsLeft--) {
      groupedPresets.push(presets.splice(0, PRESETS_TO_BANK));
    }

    const selectedValue = presetIndex
      ? presetIndex
      : pane === EDITOR_PANE.CONTROL
      ? controllerState.index
      : rackState.index;

    const onSelect = (key: string) => {
      const select =
        onPresetSelect ??
        (pane === EDITOR_PANE.CONTROL
          ? requestControllerPreset
          : requestRackPreset);
      select(+key);
    };
    return { groupedPresets, selectedValue, onSelect };
  }, [
    onPresetSelect,
    pane,
    presetIndex,
    requestControllerPreset,
    requestRackPreset,
    state,
  ]);
  return (
    <Select value={selectedValue.toString()} onValueChange={onSelect}>
      <SelectTrigger className="w-[280px] bg-slate-900 ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {groupedPresets.map((presets, index) => {
          const sample = presets[0];
          return (
            <SelectGroup key={`selectGroup-${index}`}>
              <SelectLabel className="bg-slate-300 text-slate-700">
                {`${(sample.index / PRESETS_TO_BANK)
                  .toString()
                  .padStart(2, "0")}.${sample.bankName}`}
              </SelectLabel>
              {presets.map(({ index: presetIndex, presetName }) => (
                <SelectItem
                  value={presetIndex.toString()}
                  key={`selectPreset-${presetIndex}`}
                >
                  {`${BUTTON_LABELS[presetIndex % 8]}.${presetName}`}
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
};
