import { IStateContext } from "@/consts";
import React from "react";

export const useStateContext = () => React.useContext(StateContext);

export const defaultContext: IStateContext = {
  get() {
    return {
      bank: 0,
      program: 0,
      messages: [],
      name: "",
      toggleName: "",
    };
  },
  setCurrent() {},
  setMessage() {},
  setName() {},
  setToggleName() {},
};

export const StateContext = React.createContext<IStateContext>(defaultContext);
