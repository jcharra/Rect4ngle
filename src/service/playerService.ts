import { Preferences } from "@capacitor/preferences";
import { Device } from "@capacitor/device";

const PLAYER_CONFIG = "playerConfig";

export interface Language {
  code: string;
  name: string;
}

export const ENGLISH = { code: "en", name: "English" };
export const GERMAN = { code: "de", name: "Deutsch" };

export const LANGUAGES: Language[] = [GERMAN, ENGLISH];

async function loadLanguageFromDevice() {
  const langCode = await Device.getLanguageCode();
  let languageFound;
  LANGUAGES.forEach((entry) => {
    if (entry.code === langCode.value) {
      languageFound = langCode.value;
    }
  });

  return languageFound || ENGLISH;
}

export interface PlayerConfig {
  activePlayer: number;
  names: string[];
  language: Language;
}

export async function savePlayerConfig(config: PlayerConfig) {
  await Preferences.set({
    key: PLAYER_CONFIG,
    value: JSON.stringify(config),
  });
}

export const DEFAULT_PLAYER_CONFIG = {
  activePlayer: 0,
  names: ["Player 1"],
  language: ENGLISH,
};

export async function getPlayerConfig(): Promise<PlayerConfig> {
  const existing = await Preferences.get({ key: PLAYER_CONFIG });
  if (!existing || !existing.value) {
    const defaultCfg = DEFAULT_PLAYER_CONFIG;
    const deviceLanguage = await loadLanguageFromDevice();
    defaultCfg.language = deviceLanguage;
    return defaultCfg;
  }

  const parsed = JSON.parse(existing.value);

  // backwards compat
  if (!parsed.language) {
    parsed.language = ENGLISH;
  }

  return parsed;
}
