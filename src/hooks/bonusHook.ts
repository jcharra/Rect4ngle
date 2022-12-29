import { useState } from "react";

const INITIAL_BONUSES = [1, 1, 1, 1, 1, 1, 1, 1];

export default function useBonus() {
  const [bonuses, setBonuses] = useState<number[]>(INITIAL_BONUSES);

  const getBonus = (num: number) => bonuses[num - 2];

  const upgradeBonus = (num: number) => {
    setBonuses((bs: number[]) => {
      const newBs = [...bs];
      newBs[num - 2] += 1;
      return newBs;
    });
  };

  const downgradeBonuses = () => {
    setBonuses((bs: number[]) => bs.map((b) => b - 1 || 1));
  };

  const resetBonuses = () => {
    setBonuses(INITIAL_BONUSES);
  };

  return {
    getBonus,
    upgradeBonus,
    downgradeBonuses,
    resetBonuses,
  };
}
