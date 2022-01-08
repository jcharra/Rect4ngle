export const COLUMN_LIMIT = 50;

const isPrime = (n: number) => {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

export const PRIMES: number[] = Array.from(Array(100))
  .map((_, idx) => idx)
  .filter((i) => i >= 2 && isPrime(i));

export const PRIME_BONUS = 20;
export const PRIME_MALUS = -10;

function getRandomInt(max: number) {
  return Math.ceil(Math.random() * (max - 1)) + 1;
}

export function generateRandomNumber(): number {
  if (Math.random() > 0.1) {
    const [fac1, fac2] = [getRandomInt(9), getRandomInt(12)];
    return fac1 * fac2;
  } else {
    const idx = Math.floor(Math.random() * PRIMES.length);
    return PRIMES[idx];
  }
}

export function getSum(numbers: number[]) {
  return numbers.reduce((a, b) => a + b, 0);
}
