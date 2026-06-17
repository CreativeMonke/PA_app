export interface DifficultyConfig {
  name: string;
  color: string;
  borderColor: string;
  bgColor: string;
}

export const DIFFICULTIES: DifficultyConfig[] = [
  {
    name: "Începător",
    color: "var(--color-emerald)",
    borderColor: "rgba(52,211,153,0.3)",
    bgColor: "rgba(52,211,153,0.08)",
  },
  {
    name: "Ușor",
    color: "var(--color-cyan)",
    borderColor: "rgba(34,211,238,0.3)",
    bgColor: "rgba(34,211,238,0.08)",
  },
  {
    name: "Mediu",
    color: "var(--color-amber)",
    borderColor: "rgba(251,191,36,0.3)",
    bgColor: "rgba(251,191,36,0.08)",
  },
  {
    name: "Avansat",
    color: "#f97316",
    borderColor: "rgba(249,115,22,0.3)",
    bgColor: "rgba(249,115,22,0.08)",
  },
  {
    name: "Expert",
    color: "var(--color-rose)",
    borderColor: "rgba(251,113,133,0.3)",
    bgColor: "rgba(251,113,133,0.08)",
  },
];

export function getDifficultyConfig(name: string): DifficultyConfig {
  return DIFFICULTIES.find((d) => d.name === name) ?? DIFFICULTIES[0];
}
