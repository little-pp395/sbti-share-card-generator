import questionsBank from "@/data/sbti_questions_31.json";
import resultsOverview from "@/data/sbti_results_overview_27.json";
import type { SbtiTypeConfig } from "@/lib/share-card";

type QuestionEntry = {
  id: number;
  question: string;
  options: Record<string, string>;
};

type ResultOverviewEntry = {
  code: string;
  name: string;
  tagline: string;
  url: string;
};

const presetThemes = [
  {
    background: "#101826",
    foreground: "#f8f4ec",
    accent: "#ff785a",
    accentSoft: "#20385f"
  },
  {
    background: "#f7efe1",
    foreground: "#131313",
    accent: "#f4b942",
    accentSoft: "#f7c4a7"
  },
  {
    background: "#111827",
    foreground: "#eef2ff",
    accent: "#86efac",
    accentSoft: "#243b53"
  },
  {
    background: "#1b1230",
    foreground: "#f7f0ff",
    accent: "#f973b7",
    accentSoft: "#35204f"
  },
  {
    background: "#13251a",
    foreground: "#f4f1e8",
    accent: "#7dd3a7",
    accentSoft: "#254234"
  },
  {
    background: "#2a1611",
    foreground: "#fff3eb",
    accent: "#ff9b71",
    accentSoft: "#4f291d"
  }
] as const;

const questions = questionsBank as QuestionEntry[];
const results = resultsOverview as ResultOverviewEntry[];

export const sbtiQuestionCount = questions.length;
export const sbtiResultCount = results.length;

export const sbtiPresets: SbtiTypeConfig[] = results.map((result, index) => {
  const theme = presetThemes[index % presetThemes.length];

  return {
    code: result.code,
    title: result.name,
    subtitle: buildSubtitle(result.url),
    tagline: result.tagline,
    footerText: "Built by the team behind sbtitest.co",
    ctaText: "Take the full test",
    emoji: buildBadgeText(result.code),
    theme
  };
});

function buildSubtitle(url: string) {
  const slug = url.split("/").filter(Boolean).at(-1) ?? "result";
  return `SBTI result profile: ${slug}`;
}

function buildBadgeText(code: string) {
  const compact = code.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();
  return compact || "S";
}
