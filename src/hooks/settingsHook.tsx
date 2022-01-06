import React, { createContext, useContext, useEffect, useState } from "react";
import { getPlayerConfig, savePlayerConfig } from "../service/playerService";

export interface Settings {
  activePlayerName: string;
  activePlayerIndex: number;
  selectPlayer: (n: number) => void;
  playerNames: string[];
  changePlayerName: (name: string, idx: number) => void;
}

const SettingsCtx = createContext<Settings>({
  activePlayerName: "Player 1",
  activePlayerIndex: 0,
  selectPlayer: (n: number) => {
    console.log("Dummy select");
  },
  playerNames: ["Player 1"],
  changePlayerName: (name: string, idx: number) => {
    console.log("Dummy");
  },
});

export function SettingsContextProvider({ children }: { children: React.ReactNode }) {
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  async function loadConfigFromStorage() {
    const { activePlayer, names } = await getPlayerConfig();
    console.log("Loaded", names);
    setActivePlayerIndex(activePlayer);
    setPlayerNames(names);
  }

  useEffect(() => {
    loadConfigFromStorage();
  }, []);

  function changePlayerName(name: string, index: number) {
    console.log("Change to", name);
    if (!playerNames) {
      return;
    }

    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[index] = name;
    savePlayerConfig({
      names: updatedPlayerNames,
      activePlayer: activePlayerIndex,
    });
    setPlayerNames(updatedPlayerNames);
  }

  function selectPlayer(index: number) {
    savePlayerConfig({
      names: playerNames,
      activePlayer: index,
    });
    setActivePlayerIndex(index);
  }

  return (
    <SettingsCtx.Provider
      value={{
        activePlayerIndex,
        selectPlayer,
        activePlayerName: playerNames[activePlayerIndex],
        playerNames,
        changePlayerName,
      }}
    >
      {children}
    </SettingsCtx.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsCtx);
}
