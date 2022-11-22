import { AdLoadInfo, AdMob, AdOptions, InterstitialAdPluginEvents } from "@capacitor-community/admob";

export async function showInterstitial(): Promise<void> {
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
    // Subscribe prepared interstitial
  });

  const options: AdOptions = {
    adId: "ca-app-pub-4673310281337186~4471463631",
    margin: 0,
    //isTesting: true,
    npa: true,
  };
  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
}

export const INTERSTITIAL_FREQUENCY = 5;
