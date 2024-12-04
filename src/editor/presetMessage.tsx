import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../components/ui/button";
import React from "react";
import { MsgAction, MsgActionToText, MsgType, MsgTypeToText } from "@/consts";
import { CCPresetMessageEditor } from "./ccPresetMessageEditor";
import { TCCCPresetMessageEditor } from "./tcccPresetMessageEditor";
import { TCPCPresetMessageEditor } from "./tcpcPresetMessageEditor";
import { PCPresetMessageEditor } from "./pcPresetMessageEditor";

export const PresetMessage = ({ index }: { index: number }) => {
  const [msgType, setMsgType] = React.useState<MsgType>(MsgType.none);
  const [msgAction, setMsgAction] = React.useState<MsgAction>(MsgAction.none);
  return (
    <div className="flex flex-col items-start my-3 bg-slate-700 rounded-sm overflow-hidden">
      <div className="grid grid-cols-4 grid-rows-1 p-3 gap-3  items-center">
        <span>Msg{index + 1}</span>
        <div className="flex items-center gap-x-3 w-60">
          <span>Action:</span>
          <Select
            value={msgAction.toString()}
            onValueChange={(value) => setMsgAction(+value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={MsgAction.none.toString()}>
                {MsgActionToText[MsgAction.none]}
              </SelectItem>
              <SelectItem value={MsgAction.press.toString()}>
                {MsgActionToText[MsgAction.press]}
              </SelectItem>
              <SelectItem value={MsgAction.release.toString()}>
                {MsgActionToText[MsgAction.release]}
              </SelectItem>
              <SelectItem value={MsgAction.longPress.toString()}>
                {MsgActionToText[MsgAction.longPress]}
              </SelectItem>
              <SelectItem value={MsgAction.longPressRelease.toString()}>
                {MsgActionToText[MsgAction.longPressRelease]}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-x-3">
          <span>Type:</span>
          <Select
            value={msgType.toString()}
            onValueChange={(value) => setMsgType(+value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={MsgType.none.toString()}>
                {MsgTypeToText[MsgType.none]}
              </SelectItem>
              <SelectItem value={MsgType.cc.toString()}>
                {MsgTypeToText[MsgType.cc]}
              </SelectItem>
              <SelectItem value={MsgType.pc.toString()}>
                {MsgTypeToText[MsgType.pc]}
              </SelectItem>
              <SelectItem value={MsgType.tccc.toString()}>
                {MsgTypeToText[MsgType.tccc]}
              </SelectItem>
              <SelectItem value={MsgType.tcpc.toString()}>
                {MsgTypeToText[MsgType.tcpc]}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4">
          <Button className="w-14">Copy</Button>
          <Button className="w-14">Paste</Button>
          <Button className="w-14">Clear</Button>
        </div>
      </div>
      {msgType !== MsgType.none && (
        <div className=" bg-slate-600 p-3 w-full">
          {getMessageEditor(msgType)}
        </div>
      )}
    </div>
  );
};

function getMessageEditor(type: MsgType) {
  switch (type) {
    case MsgType.none:
      return null;
    case MsgType.cc:
      return <CCPresetMessageEditor />;
    case MsgType.pc:
      return <PCPresetMessageEditor />;
    case MsgType.tccc:
      return <TCCCPresetMessageEditor />;
    case MsgType.tcpc:
      return <TCPCPresetMessageEditor />;
  }
}
