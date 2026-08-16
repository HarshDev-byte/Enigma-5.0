// Audio System Disabled
// Completely silent no-op engine to ensure zero audio playback

class SoundEngine {
  public toggleMute(): boolean {
    return true;
  }

  public getMuted(): boolean {
    return true;
  }

  public startAmbient() {}
  public playClick() {}
  public playKeypress() {}
  public playGlitch() {}
  public playGenesisActivation() {}
  public playAccessGranted() {}
}

export const sound = new SoundEngine();
