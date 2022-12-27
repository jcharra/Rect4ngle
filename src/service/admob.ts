import { AdLoadInfo, AdMob, AdOptions, InterstitialAdPluginEvents } from "@capacitor-community/admob";

export async function showInterstitial(): Promise<void> {
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
    // Subscribe prepared interstitial
  });

  const options: AdOptions = {
    adId: "ca-app-pub-4673310281337186/3704057319",
    margin: 0,
    //isTesting: true,
    npa: true,
  };
  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
}

export const INTERSTITIAL_FREQUENCY = 3;
export const REVIEW_FREQUENCY = 30;
