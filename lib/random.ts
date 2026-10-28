// Deterministic Park–Miller generator, so server and client render the same
// "random" patterns (pixel fields, chart bars) and hydration stays stable.
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
