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
