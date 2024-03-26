import { Preferences } from "@capacitor/preferences";

const TUTORIAL_SEEN = "tutorialSeen";
//export const TUTORIAL_NUMBERS = [20, 32, 25, 9, 17, 36, 11, 30];
export const TUTORIAL_NUMBERS = [17, 36, 11, 30];

export async function markAsSeen() {
  await Preferences.set({
    key: TUTORIAL_SEEN,
    value: JSON.stringify(true),
  });
}

export async function hasBeenSeen(): Promise<boolean> {
  const existing = await Preferences.get({ key: TUTORIAL_SEEN });
  return existing && !!existing.value;
}
