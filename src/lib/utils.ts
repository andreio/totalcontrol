import {
  IControllerState,
  IRackState,
  PresetId,
  SYSEX_REQUESTS,
  SYSEX_RESPONSES,
  SYSEX_START,
  SYSEX_STOP,
} from "@/consts";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const strToCodes = (str: string) =>
  Array.from(str.padEnd(8, " ")).map((x) => x.charCodeAt(0));

export const codesToStr = (codes: number[]) => String.fromCharCode(...codes);

export function sysex(data: number[]) {
  return [SYSEX_START, 23, ...data, SYSEX_STOP];
}

export const parseResponse = (
  data: number[]
): { type: SYSEX_RESPONSES; response: number[] } => {
  const [, , type, ...response] = data;
  response.pop();
  return {
    type,
    response,
  };
};
export const parseControllerPresetData = (
  data: number[]
): IControllerState => ({
  bank: data.shift() || 0,
  program: data.shift() || 0,
  name: codesToStr(data.splice(0, 8)),
  bankName: codesToStr(data.splice(0, 8)),
  toggleName: codesToStr(data.splice(0, 8)),
  messages: Array.from({ length: 8 }).map(() => {
    const [
      index,
      type,
      action,
      ccNumber,
      pcNumber,
      ccValue,
      midiChannel,
      omni,
      loop0,
      loop1,
      loop2,
      loop3,
      loop4,
      loop5,
      loop6,
      loop7,
      loop8,
      loop9,
      rackBank,
      rackPreset,
    ] = data.splice(0, 20);
    return {
      index,
      type,
      action,
      ccNumber,
      pcNumber,
      ccValue,
      midiChannel,
      omni: !!omni,
      loops: [
        loop0,
        loop1,
        loop2,
        loop3,
        loop4,
        loop5,
        loop6,
        loop7,
        loop8,
        loop9,
      ],
      rackBank,
      rackPreset,
    };
  }),
});
export const makeControllerPresetData = (state: IControllerState) =>
  sysex([
    SYSEX_REQUESTS.SEND_CONTROLLER_PRESET_STATE,
    state.bank,
    state.program,
    ...strToCodes(state.name),
    ...strToCodes(state.toggleName),
    ...strToCodes(state.bankName),
    ...state.messages
      .map(
        ({
          index,
          type,
          action,
          ccNumber,
          pcNumber,
          ccValue,
          midiChannel,
          omni,
          loops,
          rackBank,
          rackPreset,
        }) => [
          index,
          type,
          action,
          ccNumber,
          pcNumber,
          ccValue,
          midiChannel,
          +omni,
          rackBank,
          rackPreset,
          ...loops,
        ]
      )
      .flat(1),
  ]);

export const makeRackPresetData = ({
  bank,
  bankName,
  loops,
  name,
  program,
}: IRackState) =>
  sysex([
    SYSEX_REQUESTS.SEND_RACK_PRESET_STATE,
    bank,
    program,
    ...strToCodes(name),
    ...strToCodes(bankName),
    ...loops,
  ]);

export const parseRackPresetData = (data: number[]): IRackState => ({
  bank: data.shift() || 0,
  program: data.shift() || 0,
  name: codesToStr(data.splice(0, 8)),
  bankName: codesToStr(data.splice(0, 8)),
  loops: data,
});

export const makeRackLoopNamesData = (loopNames: string[]) =>
  sysex([
    SYSEX_REQUESTS.SEND_RACK_LOOP_NAMES,
    ...loopNames.map(strToCodes).flat(1),
  ]);

export const parseRackLoopNamesData = (data: number[]) =>
  Array.from({ length: 9 }).map(() => codesToStr(data.splice(0, 9)));

export const parsePresetIdsData = (data: number[]): PresetId[] =>
  Array.from({ length: 127 }).map(() => ({
    bank: data.shift() || 0,
    preset: data.shift() || 0,
    presetName: codesToStr(data.splice(0, 8)),
    bankName: codesToStr(data.splice(0, 8)),
  }));

export const pingRequest = () => sysex([SYSEX_REQUESTS.PING]);

export const makeControllerPresetRequestData = () =>
  sysex([SYSEX_REQUESTS.REQUEST_CONTROLLER_PRESET_STATE]);
export const makeControllerPresetIdsData = () =>
  sysex([SYSEX_REQUESTS.REQUEST_CONTROLLER_PRESET_IDS]);

export const makeRackPresetRequestData = () =>
  sysex([SYSEX_REQUESTS.REQUEST_RACK_PRESET_STATE]);
export const makeRackPresetIdsData = () =>
  sysex([SYSEX_REQUESTS.REQUEST_RACK_PRESET_IDS]);
export const makeRackLoopNamesRequestData = () =>
  sysex([SYSEX_REQUESTS.REQUEST_RACK_LOOP_NAMES]);
