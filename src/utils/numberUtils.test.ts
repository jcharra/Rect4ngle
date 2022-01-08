import React from "react";
import { generateRandomNumber, PRIMES } from "./numberUtils";

it("generates all primes at least once", () => {
  let nums = [];
  for (let i = 0; i < 1000000; i++) {
    nums.push(generateRandomNumber());
  }

  for (const p of PRIMES) {
    expect(nums.indexOf(p) > -1).toBeTruthy();
  }
});
