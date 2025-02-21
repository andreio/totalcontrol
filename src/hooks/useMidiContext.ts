import { IMidiContext } from "@/consts";
import React from "react";

export const useMidiContext = () => React.useContext(MidiContext);
export const defaultContext: IMidiContext = {};

export const MidiContext = React.createContext<IMidiContext>(defaultContext);
