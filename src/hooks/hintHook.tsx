import React, { createContext, useContext, useState } from "react";

interface HintContext {
  hint: string;
  scheduleHint: (hint: string, timeout: number) => void;
}

const HintCtx = createContext<HintContext>({
  hint: "",
  scheduleHint: (h: string, t: number) => {},
});

export function HintContextProvider({ children }: { children: React.ReactNode }) {
  const [hint, setHint] = useState("");
  const [scheduleRef, setScheduleRef] = useState<NodeJS.Timeout | undefined>();

  function scheduleHint(hint: string, timeout: number) {
    if (scheduleRef) {
      clearTimeout(scheduleRef);
    }

    if (timeout) {
      const newRef = setTimeout(() => {
        setHint(hint);
        scheduleHint("", 3000);
      }, timeout);

      setScheduleRef(newRef);
    } else {
      setHint(hint);

      if (hint) {
        scheduleHint("", 3000);
      }
    }
  }

  return (
    <HintCtx.Provider
      value={{
        hint,
        scheduleHint,
      }}
    >
      {children}
    </HintCtx.Provider>
  );
}

export function useHint() {
  return useContext(HintCtx);
}
