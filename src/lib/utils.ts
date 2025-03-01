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
  Array.from(str.padEnd(9, "\0")).map((x) => x.charCodeAt(0));

export const codesToStr = (data: number[]) =>
  String.fromCharCode(...data.splice(0, 9)).replace(/\0/g, "");

export function sysex(data: number[]) {
  return [SYSEX_START, 23, ...data, SYSEX_STOP];
}

export const parseResponse = (
  data: number[]
): { type: SYSEX_RESPONSES; response: number[]; deviceId: number } => {
  const [, deviceId, type, ...response] = data;
  console.log(data.slice(0));

  response.pop();
  return {
    type,
    response,
    deviceId,
  };
};

/**
 * send
 */

export const makeControllerPresetData = ({
  index,
  bankName,
  messages,
  name,
  toggleName,
}: IControllerState) =>
  sysex([
    SYSEX_REQUESTS.SEND_CONTROLLER_PRESET_STATE,
    index,
    ...strToCodes(bankName),
    ...strToCodes(name),
    ...strToCodes(toggleName),
    ...messages
      .map(
        ({
          type,
          action,
          ccNumber,
          pcNumber,
          ccValue,
          midiChannel,
          omni,
          loops,
          rackPreset,
        }) => [
          type,
          action,
          ccNumber,
          pcNumber,
          ccValue,
          midiChannel,
          +omni,
          rackPreset,
          ...loops,
        ]
      )
      .flat(1),
  ]);

export const makeRackPresetData = ({
  index,
  bankName,
  loops,
  name,
}: IRackState) =>
  sysex([
    SYSEX_REQUESTS.SEND_RACK_PRESET_STATE,
    index,
    ...strToCodes(name),
    ...strToCodes(bankName),
    ...loops,
  ]);

export const makeRackLoopNamesData = (loopNames: string[]) =>
  sysex([
    SYSEX_REQUESTS.SEND_RACK_LOOP_NAMES,
    ...loopNames.map(strToCodes).flat(1),
  ]);

/**
 * receive
 */

export const parseControllerPresetData = (
  data: number[]
): IControllerState => ({
  index: data.shift() || 0,
  bankName: codesToStr(data),
  name: codesToStr(data),
  toggleName: codesToStr(data),
  messages: Array.from({ length: 8 }).map(() => {
    const [
      type,
      action,
      ccNumber,
      pcNumber,
      ccValue,
      midiChannel,
      omni,
      rackPreset,
      loop0,
      loop1,
      loop2,
      loop3,
      loop4,
      loop5,
      loop6,
      loop7,
      loop8,
    ] = data.splice(0, 17);
    return {
      type,
      action,
      ccNumber,
      pcNumber,
      ccValue,
      midiChannel,
      omni: !!omni,
      rackPreset,
      loops: [loop0, loop1, loop2, loop3, loop4, loop5, loop6, loop7, loop8],
    };
  }),
});

export const parseRackPresetData = (data: number[]): IRackState => ({
  index: data.shift() || 0,
  bankName: codesToStr(data),
  name: codesToStr(data),
  loops: data,
});

export const parseRackLoopNamesData = (data: number[]) =>
  Array.from({ length: 9 }).map(() => codesToStr(data));

export const parsePresetIdsData = (data: number[]): PresetId[] =>
  Array.from({ length: 128 }).map(() => ({
    index: data.shift() || 0,
    presetName: codesToStr(data),
    bankName: codesToStr(data),
  }));

/**
 * requests
 */
export const pingRequest = () => sysex([SYSEX_REQUESTS.PING]);
export const makeControllerPresetRequestData = (presetIndex: number) =>
  sysex([SYSEX_REQUESTS.REQUEST_CONTROLLER_PRESET_STATE, presetIndex]);
export const makeControllerPresetIdsRequestData = () =>
  sysex([SYSEX_REQUESTS.REQUEST_CONTROLLER_PRESET_IDS]);
export const makeRackPresetRequestData = (presetIndex: number) =>
  sysex([SYSEX_REQUESTS.REQUEST_RACK_PRESET_STATE, presetIndex]);
export const makeRackPresetIdsRequestData = () =>
  sysex([SYSEX_REQUESTS.REQUEST_RACK_PRESET_IDS]);
export const makeRackLoopNamesRequestData = () =>
  sysex([SYSEX_REQUESTS.REQUEST_RACK_LOOP_NAMES]);
export const makeFactoryResetRequestData = () => sysex([SYSEX_REQUESTS.RESET]);

export const waitChain = (time: number) => {
  let promise = Promise.resolve();
  const wait = (fn: () => void) => {
    promise = promise.then(
      () =>
        new Promise<void>((resolve) =>
          setTimeout(() => {
            fn();
            resolve();
          }, time)
        )
    );
    return wait;
  };
  return wait;
};
