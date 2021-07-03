import { Storage } from "@capacitor/storage";

const TUTORIAL_SEEN = "tutorialSeen";

export async function markAsSeen() {
  await Storage.set({
    key: TUTORIAL_SEEN,
    value: JSON.stringify(true),
  });
}

export async function hasBeenSeen(): Promise<boolean> {
  const existing = await Storage.get({ key: TUTORIAL_SEEN });
  return existing && !!existing.value;
}
