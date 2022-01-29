export class AudioManager {
  static sounds = {
    GAME_OVER: "GAME_OVER",
    CORRECT: "CORRECT",
    INCORRECT: "INCORRECT",
    COMPLETE: "COMPLETE",
  };

  constructor() {
    this.audioFiles = {
      [AudioManager.sounds.GAME_OVER]: "/audio/game_completed.wav",
      [AudioManager.sounds.CORRECT]: "/audio/correct_answer.wav",
      [AudioManager.sounds.COMPLETE]: "/audio/complete.wav",
      [AudioManager.sounds.INCORRECT]: "/audio/incorrect_answer.wav",
    };

    this.preload();
  }

  async preload() {
    const buffers = await Promise.all(
      await Object.entries(this.audioFiles).map(async ([key, url]) => {
        const audio = await this.getAudioBufferFor(url);
        return { audio, key };
      })
    );

    buffers.forEach(({ audio, key }) => (this.audioFiles[key] = audio));
  }

  getAudioBufferFor(url) {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      audio.addEventListener("canplaythrough", (event) => {
        /* the audio is now playable; play it if permissions allow */
        resolve(audio);
      });
    });
  }

  playSound(key) {
    const audio = this.audioFiles[key];
    if (audio) {
      audio.play();
    }
  }
}

export default new AudioManager();
