import { IState, IStateContext } from "@/consts";
import { StateContext } from "@/hooks/useStateContext";
import React from "react";

export const StateProvider = ({ children }: React.PropsWithChildren) => {
  const [appState, setAppState] = React.useState<IState>({
    bank: 0,
    messages: [],
    name: "",
    program: 0,
    toggleName: "",
  });
  const context = React.useMemo<IStateContext>(() => {
    return {
      get() {
        return appState;
      },
      setCurrent(bank, program) {
        console.log("setCurrent", bank, program);
        setAppState({ ...appState, bank, program });
      },
      setName(name) {
        setAppState({ ...appState, name });
        console.log("setName", name);
      },
      setToggleName(toggleName) {
        setAppState({ ...appState, toggleName });
        console.log("setToggleName", name);
      },
      setMessage(index, messageState) {
        const messages = appState.messages.slice();
        messages[index] = messageState;
        setAppState({ ...appState, messages });
        console.log("setMessage", index, messageState);
      },
    };
  }, [appState]);
  return (
    <StateContext.Provider value={context}>{children}</StateContext.Provider>
  );
};
