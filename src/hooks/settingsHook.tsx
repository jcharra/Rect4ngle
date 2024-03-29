import React, { createContext, useContext, useEffect, useState } from "react";
import { ENGLISH, LANGUAGES, Language, getPlayerConfig, savePlayerConfig } from "../service/playerService";

export interface Settings {
  activePlayerName: string;
  activePlayerIndex: number;
  selectPlayer: (n: number) => void;
  playerNames: string[];
  changePlayerName: (name: string, idx: number) => void;
  language: Language;
  changeLanguage: (code: string) => void;
  scoresPublic: boolean;
  setScoresPublic: (isPublic: boolean) => void;
}

const SettingsCtx = createContext<Settings>({
  activePlayerName: "Player 1",
  activePlayerIndex: 0,
  selectPlayer: (n: number) => {
    console.log("Dummy select");
  },
  playerNames: ["Player 1"],
  changePlayerName: (name: string, idx: number) => {},
  language: ENGLISH,
  changeLanguage: (code: string) => {},
  scoresPublic: true,
  setScoresPublic: (isPublic: boolean) => {},
});

export function SettingsContextProvider({ children }: { children: React.ReactNode }) {
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [language, setLanguage] = useState<Language>(ENGLISH);
  const [scoresPublic, _setScoresPublic] = useState(true);

  async function loadConfigFromPreferences() {
    const { activePlayer, names, language } = await getPlayerConfig();
    setActivePlayerIndex(activePlayer);
    setPlayerNames(names);
    setLanguage(language);
  }

  useEffect(() => {
    loadConfigFromPreferences();
  }, []);

  function changePlayerName(name: string, index: number) {
    if (!playerNames) {
      return;
    }

    const updatedPlayerNames = [...playerNames];
    updatedPlayerNames[index] = name;
    savePlayerConfig({
      names: updatedPlayerNames,
      activePlayer: activePlayerIndex,
      language,
      scoresPublic,
    });
    setPlayerNames(updatedPlayerNames);
  }

  function selectPlayer(index: number) {
    savePlayerConfig({
      names: playerNames,
      activePlayer: index,
      language,
      scoresPublic,
    });
    setActivePlayerIndex(index);
  }

  function changeLanguage(code: string) {
    for (let lang of LANGUAGES) {
      if (lang.code === code) {
        savePlayerConfig({
          names: playerNames,
          activePlayer: activePlayerIndex,
          language: lang,
          scoresPublic,
        });
        setLanguage(lang);
        break;
      }
    }
  }

  function setScoresPublic(visible: boolean) {
    _setScoresPublic(visible);
    savePlayerConfig({
      names: playerNames,
      activePlayer: activePlayerIndex,
      language,
      scoresPublic: visible,
    });
  }

  return (
    <SettingsCtx.Provider
      value={{
        activePlayerIndex,
        selectPlayer,
        activePlayerName: playerNames[activePlayerIndex],
        playerNames,
        changePlayerName,
        language,
        changeLanguage,
        scoresPublic,
        setScoresPublic,
      }}
    >
      {children}
    </SettingsCtx.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsCtx);
}
