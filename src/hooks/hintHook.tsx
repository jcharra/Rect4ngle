import React, { createContext, useContext, useState } from "react";

interface HintContext {
  hint: string;
  showHint: (hint: string, timeout: number) => void;
  clearHint: () => void;
}

const HintCtx = createContext<HintContext>({
  hint: "",
  showHint: (h: string, t: number) => {},
  clearHint: () => {},
});

export function HintContextProvider({ children }: { children: React.ReactNode }) {
  const [hint, setHint] = useState("");
  const [clearRef, setClearRef] = useState<NodeJS.Timeout | undefined>();

  function showHint(hint: string) {
    if (clearRef) {
      clearTimeout(clearRef);
    }

    setHint(hint);
    const cRef = setTimeout(clearHint, 3000);
    setClearRef(cRef);
  }

  function clearHint() {
    if (clearRef) {
      clearTimeout(clearRef);
    }
    setHint("");
  }

  return (
    <HintCtx.Provider
      value={{
        hint,
        showHint,
        clearHint,
      }}
    >
      {children}
    </HintCtx.Provider>
  );
}

export function useHint() {
  return useContext(HintCtx);
}
