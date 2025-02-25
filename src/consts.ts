export enum MsgType {
  "none",
  "pc",
  "cc",
  "tccc",
  "tcpc",
  tap,
}
export enum MsgAction {
  "none",
  "press",
  "release",
  "longPress",
  "longPressRelease",
  "tap",
}

export enum LoopToggle {
  "unchanged",
  "set",
  "unset",
}

export enum LoopState {
  "off",
  "on",
}

export enum EDITOR_PANE {
  CONTROL = "CONTROL_PANE",
  RACK = "RACK_PANE",
}

export const MsgTypeToText = {
  [MsgType.none]: "None",
  [MsgType.pc]: "Program Change",
  [MsgType.cc]: "Control Change",
  [MsgType.tccc]: "TC Change",
  [MsgType.tcpc]: "TC Program Change",
};

export const MsgActionToText = {
  [MsgAction.none]: "None",
  [MsgAction.press]: "Press",
  [MsgAction.release]: "Release",
  [MsgAction.longPress]: "Long Press",
  [MsgAction.longPressRelease]: "Long Press Release",
  [MsgAction.tap]: "Tap Tempo",
};

export const LoopToggleToText = {
  [LoopToggle.unchanged]: "Unchanged",
  [LoopToggle.set]: "On",
  [LoopToggle.unset]: "Off",
};

export interface IMidiContext {
  output?: MIDIOutput;
  input?: MIDIInput;
  error?: string;
}

export interface IMidiCommsContext {
  requestControllerPreset(): void;
  sendControllerPreset(): void;
  requestRackPreset(): void;
  sendRackPreset(): void;
  requestRackLoopNames(): void;
  sendRackLoopNames(): void;
}

export type PresetId = {
  presetName: string;
  preset: number;
  bankName: string;
  bank: number;
};

export interface IStateContext {
  setControllerState(state: IControllerState): void;
  getControllerState(): IControllerState;
  setControllerCurrent(bank: number, program: number): void;
  setControllerPresetName(name: string): void;
  setControllerTogglePresetName(name: string): void;
  setControllerBankName(name: string): void;
  setControllerMessage(
    index: number,
    messageState: IControllerMessageState
  ): void;
  setRackState(state: IRackState): void;
  getRackState(): IRackState;
  setRackCurrent(bank: number, program: number): void;
  setRackPresetName(name: string): void;
  setRackBankName(name: string): void;
  setRackPresetLoops(loops: LoopToggle[]): void;
  setRackLoopNames(names: string[]): void;
  getRackLoopNames(): string[];
  getAllControllerPresetIds(): PresetId[];
  getAllRackPresetIds(): PresetId[];
  setAllControllerPresetIds(presetIds: PresetId[]): void;
  setAllRackPresetIds(presetIds: PresetId[]): void;
}
export interface IControllerState {
  bank: number;
  program: number;
  messages: IControllerMessageState[];
  name: string;
  toggleName: string;
  bankName: string;
}

export type IControllerMessageState = {
  index: number;
  action: MsgAction;
  type: MsgType;
  ccNumber: number;
  ccValue: number;
  pcNumber: number;
  omni: boolean;
  midiChannel: number;
  loops: LoopToggle[];
  rackPreset: number;
  rackBank: number;
};

export interface IRackState {
  bank: number;
  bankName: string;
  program: number;
  name: string;
  loops: LoopToggle[];
}
export interface IRackStateLoop {
  index: number;
  name: string;
  loops: LoopToggle[];
}

export const SYSEX_START = 0xf0;
export const SYSEX_STOP = 0xf7;

export enum SYSEX_REQUESTS {
  REQUEST_CONTROLLER_PRESET_STATE,
  SEND_CONTROLLER_PRESET_STATE,
  REQUEST_RACK_PRESET_STATE,
  SEND_RACK_PRESET_STATE,
  REQUEST_RACK_LOOP_NAMES,
  SEND_RACK_LOOP_NAMES,
  REQUEST_CONTROLLER_PRESET_IDS,
  REQUEST_RACK_PRESET_IDS,
  PING,
}
export enum SYSEX_RESPONSES {
  RECEIVE_CONTROLLER_PRESET_STATE,
  RECEIVE_RACK_PRESET_STATE,
  RECEIVE_CONTROLLER_PRESET_IDS,
  RECEIVE_RACK_PRESET_IDS,
  RECEIVE_RACK_LOOP_NAMES,
  PONG,
}

export const EMPTY_MESSAGE_STATE = {
  type: MsgType.none,
  action: MsgAction.none,
  ccNumber: 0,
  ccValue: 0,
  pcNumber: 0,
  midiChannel: 0,
  omni: false,
  rackPreset: 0,
  rackBank: 0,
  index: 0,
  loops: Array.from({ length: 9 }).map(() => LoopToggle.unchanged),
};

export const EMPTY_CONTROLLER_STATE: IControllerState = {
  bank: 0,
  messages: Array.from({ length: 8 }).map((_, index) => ({
    ...EMPTY_MESSAGE_STATE,
    index,
  })),
  name: "",
  program: 0,
  toggleName: "",
  bankName: "",
};

export const EMPTY_PRESET_STATE: IRackStateLoop = {
  index: 0,
  name: "",
  loops: Array.from({ length: 9 }).map(() => LoopToggle.unchanged),
};

export const EMPTY_RACK_STATE: IRackState = {
  program: 0,
  loops: Array.from({ length: 9 }).map(() => LoopToggle.unset),
  name: "",
  bank: 0,
  bankName: "",
};

export const DEFAULT_LOOP_NAMES = [
  "L1",
  "L2",
  "L3",
  "L4",
  "L5",
  "L6",
  "L7",
  "S1",
  "S2",
];

export const RACK_LOOPS = 7;
export const RACK_CHANNELS = 2;

export const EMPTY_PRESET_IDS: PresetId[] = Array.from({
  length: 16,
})
  .map((_, bankIndex) =>
    Array.from({ length: 8 }).map(
      (_, presetIndex) =>
        ({
          bank: bankIndex,
          bankName: `Bank ${bankIndex}`,
          preset: presetIndex,
          presetName: `Preset ${presetIndex}`,
        } as PresetId)
    )
  )
  .flat(1);

export const BUTTON_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H"];
