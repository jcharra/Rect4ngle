import { Preferences } from "@capacitor/preferences";

const TUTORIAL_SEEN = "tutorialSeen";

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
