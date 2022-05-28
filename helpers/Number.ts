export const populationFormatter = (population: number): string => {
  if (population >= 1000000000) {
    return (population / 1000000000).toFixed(1).replace(/\.0$/, '') + ' billion';
  }
  if (population >= 1000000) {
    return (population / 1000000).toFixed(1).replace(/\.0$/, '') + ' million';
  }
  if (population >= 1000) {
    return (population / 1000).toFixed(3).replace(/\.0$/, '').replace('.', ',');
  }
  return population.toString();
};
