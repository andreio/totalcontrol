import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUTTON_LABELS, EDITOR_PANE, PresetId } from "@/consts";
import { useStateContext } from "@/hooks/useStateContext";
import React from "react";

const PRESETS_TO_BANK = 8;
const sep = "%";
const ptos = (bank: number, program: number) => `${bank}${sep}${program}`;
const stop = (key: string) => key.split(sep).map((x) => +x);

export const PresetSelector = ({
  pane,
  onPresetSelect,
  presetValue,
}: {
  pane: EDITOR_PANE;
  onPresetSelect?: (bank: number, preset: number) => void;
  presetValue?: [number, number];
}) => {
  const state = useStateContext();
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
    console.log(JSON.stringify(groupedPresets));

    const selectedValue = presetValue
      ? ptos(...presetValue)
      : pane === EDITOR_PANE.CONTROL
      ? ptos(controllerState.bank, controllerState.program)
      : ptos(rackState.bank, rackState.program);

    const onSelect = (key: string) => {
      const [bank, preset] = stop(key);
      const select =
        onPresetSelect ??
        (pane === EDITOR_PANE.CONTROL
          ? state.setControllerCurrent
          : state.setRackCurrent);
      select(bank, preset);
    };
    return { groupedPresets, selectedValue, onSelect };
  }, [onPresetSelect, pane, presetValue, state]);
  return (
    <Select value={selectedValue} onValueChange={onSelect}>
      <SelectTrigger className="w-[280px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {groupedPresets.map((presets, index) => {
          const sample = presets[0];
          return (
            <SelectGroup key={`selectGroup-${index}`}>
              <SelectLabel className="bg-slate-300 text-slate-700">
                {`${sample.bank.toString().padStart(2, "0")}.${
                  sample.bankName
                }`}
              </SelectLabel>
              {presets.map(({ bank, preset, presetName }, index) => (
                <SelectItem
                  value={ptos(bank, preset)}
                  key={`selectPreset-${index}`}
                >
                  {`${BUTTON_LABELS[preset]}.${presetName}`}
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
};
