export enum MsgType {
  "none",
  "pc",
  "cc",
  "tccc",
  "tcpc",
}
export enum MsgAction {
  "none",
  "press",
  "release",
  "longPress",
  "longPressRelease",
}

export enum LoopToggle {
  "unchanged",
  "set",
  "unset",
}

export const MsgTypeToText = {
  [MsgType.none]: "None",
  [MsgType.pc]: "PC",
  [MsgType.cc]: "CC",
  [MsgType.tccc]: "TcCC",
  [MsgType.tcpc]: "TcPC",
};

export const MsgActionToText = {
  [MsgAction.none]: "None",
  [MsgAction.press]: "Press",
  [MsgAction.release]: "Release",
  [MsgAction.longPress]: "Long Press",
  [MsgAction.longPressRelease]: "Long Press Release",
};

export const LoopToggleToText = {
  [LoopToggle.unchanged]: "Unchanged",
  [LoopToggle.set]: "On",
  [LoopToggle.unset]: "Off",
};

export interface IMidiContext {
  midiAccess?: MIDIAccess;
  error?: string;
}

export interface IStateContext {
  get(): IState;
  setCurrent(bank: number, program: number): void;
  setName(name: string): void;
  setToggleName(name: string): void;
  setMessage(index: number, messageState: IMessageState): void;
}

export interface IState {
  bank: number;
  program: number;
  messages: IMessageState[];
  name: string;
  toggleName: string;
}

export type IMessageState =
  | ICCMessageState
  | IPCMessageState
  | ITcCCMessageState
  | ITcPCMessageState;

export interface ICCMessageState {
  index: number;
  action: MsgAction;
  ccNumber: number;
  ccValue: number;
  midiChannel: number;
}

export interface IPCMessageState {
  index: number;
  action: MsgAction;
  pcNumber: number;
  omni: boolean;
  midiChannel: number;
}

export interface ITcCCMessageState {
  index: number;
  action: MsgAction;
  loops: LoopToggle[];
}

export interface ITcPCMessageState {
  index: number;
  action: MsgAction;
  rackPreset: number;
}

export const SYSEX_START = 0xf0;
export const SYSEX_STOP = 0x7f;

export enum SYSEX_COMMANDS {
  SELECT_BANK,
  SELECT_PRESET,
  SET_NAME,
  SET_TOGGLE_NAME,
  SET_MESSAGE,
}
