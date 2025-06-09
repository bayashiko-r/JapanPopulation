import { useEffect, useRef, useState } from "react";

const INITIAL_POPULATION = 124250000;
const BASE_CHANGE_PER_SEC = -0.59;
const RANDOM_VARIATION = 0.01; // ±の揺らぎ幅

function PopulationCounter() {
  const [population, setPopulation] = useState(INITIAL_POPULATION);
  const populationRef = useRef(INITIAL_POPULATION);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomFluctuation = (Math.random() * 2 - 1) * RANDOM_VARIATION; // -0.01〜+0.01
      const change = BASE_CHANGE_PER_SEC + randomFluctuation;

      populationRef.current += change;
      setPopulation(populationRef.current);
    }, 1000); // 1秒ごとに更新

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="text-xl mb-4">日本の推定人口（リアルタイム）</div>
      <div className="text-xl font-bold tabular-nums">
        {population.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}人
      </div>
    </div>
  );
}

export default PopulationCounter;
