export function countdownSound() {
  playSound("beep1");
}

export function powerUpSound() {
  playSound("bonus");
}

export function primeSound() {
  playSound("prime");
}

export function gameStartSound() {
  playSound("success");
}

function playSound(soundId: string) {
  const audioSrc = (document as any).getElementById(soundId).src;
  const sound = new Audio();
  sound.autoplay = true;
  sound.src = audioSrc;
}
