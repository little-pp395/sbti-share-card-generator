import type { SbtiTypeConfig } from "@/lib/share-card";

export const sbtiPresets: SbtiTypeConfig[] = [
  {
    code: "Malo",
    title: "Chaos Strategist",
    subtitle: "You plan too much to be random",
    tagline: "Turns every silly idea into a polished launch, then calls it an experiment.",
    footerText: "Built by the team behind sbtitest.co",
    ctaText: "Take the full test",
    emoji: "??",
    theme: {
      background: "#101826",
      foreground: "#f8f4ec",
      accent: "#ff785a",
      accentSoft: "#20385f"
    }
  },
  {
    code: "OjBk",
    title: "Deadline Acrobat",
    subtitle: "Suspiciously calm under pressure",
    tagline: "Ships on time, improvises in public, and somehow makes crunch look curated.",
    footerText: "Built by the team behind sbtitest.co",
    ctaText: "Explore all types",
    emoji: "?",
    theme: {
      background: "#f7efe1",
      foreground: "#131313",
      accent: "#f4b942",
      accentSoft: "#f7c4a7"
    }
  },
  {
    code: "Youwu",
    title: "Mystic Operator",
    subtitle: "Half intuition, half spreadsheet",
    tagline: "Collects weird signals, spots patterns early, and makes the timeline feel fake.",
    footerText: "Built by the team behind sbtitest.co",
    ctaText: "Try the interactive test",
    emoji: "??",
    theme: {
      background: "#111827",
      foreground: "#eef2ff",
      accent: "#86efac",
      accentSoft: "#243b53"
    }
  }
];
