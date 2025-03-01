import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../../components/ui/button";
import React from "react";
import {
  IControllerMessageState,
  MsgAction,
  MsgActionToText,
  MsgType,
  MsgTypeToText,
} from "@/consts";
import { CCPresetMessageEditor } from "./ccPresetMessageEditor";
import { TCCCPresetMessageEditor } from "./tcccPresetMessageEditor";
import { TCPCPresetMessageEditor } from "./tcpcPresetMessageEditor";
import { PCPresetMessageEditor } from "./pcPresetMessageEditor";
import {
  ClipboardCheckIcon,
  ClipboardPasteIcon,
  DeleteIcon,
} from "lucide-react";
import { TapPresetMessageEditor } from "./tapPresetMessageEditor";
import { useStateContext } from "@/hooks/useStateContext";

export const PresetMessage = ({ index }: { index: number }) => {
  const state = useStateContext();
  const controllerState = state.getControllerState();
  return (
    <div className="flex flex-col items-start my-3 bg-slate-700 rounded-sm overflow-hidden">
      <div className="grid grid-cols-4 grid-rows-1 p-3 gap-3  items-center">
        <span>Msg{index + 1}</span>
        <div className="flex items-center gap-x-3 w-60">
          <span>Action:</span>
          <Select
            value={controllerState.messages[index].action.toString()}
            onValueChange={(value) => {
              const messages = controllerState.messages.slice();
              messages[index].action = +value;
              state.setControllerState({ ...controllerState, messages });
            }}
          >
            <SelectTrigger className="bg-slate-900">
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
              <SelectItem value={MsgAction.tap.toString()}>
                {MsgActionToText[MsgAction.tap]}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-x-3">
          {controllerState.messages[index].action !== MsgAction.tap && (
            <>
              <span>Type:</span>
              <Select
                value={controllerState.messages[index].type.toString()}
                onValueChange={(value) => {
                  const messages = controllerState.messages.slice();
                  messages[index].type = +value;
                  state.setControllerState({ ...controllerState, messages });
                }}
              >
                <SelectTrigger className="bg-slate-900">
                  <SelectValue placeholder="select" />
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
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <ClipboardCheckIcon />
            Copy
          </Button>
          <Button variant="secondary">
            <ClipboardPasteIcon />
            Paste
          </Button>
          <Button variant="secondary">
            <DeleteIcon />
            Clear
          </Button>
        </div>
      </div>
      {(controllerState.messages[index].type !== MsgType.none ||
        controllerState.messages[index].action === MsgAction.tap) && (
        <div className=" bg-slate-600 p-3 w-full">
          {getMessageEditor(
            controllerState.messages[index].action,
            controllerState.messages[index].type,
            controllerState.messages[index],
            index
          )}
        </div>
      )}
    </div>
  );
};

function getMessageEditor(
  msgAction: MsgAction,
  msgType: MsgType,
  messageState: IControllerMessageState,
  index: number
) {
  if (msgAction === MsgAction.tap) {
    return <TapPresetMessageEditor state={messageState} presetIndex={index} />;
  }
  switch (msgType) {
    case MsgType.none:
      return null;
    case MsgType.cc:
      return <CCPresetMessageEditor state={messageState} presetIndex={index} />;
    case MsgType.pc:
      return <PCPresetMessageEditor state={messageState} presetIndex={index} />;
    case MsgType.tccc:
      return (
        <TCCCPresetMessageEditor state={messageState} presetIndex={index} />
      );
    case MsgType.tcpc:
      return (
        <TCPCPresetMessageEditor state={messageState} presetIndex={index} />
      );
  }
}
