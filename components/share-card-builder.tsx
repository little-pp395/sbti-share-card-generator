"use client";

import { useState } from "react";
import { ShareCardPreview } from "@/components/share-card-preview";
import {
  createEditableCard,
  downloadCardPng,
  type EditableCardData,
  type SbtiTypeConfig
} from "@/lib/share-card";

type ShareCardBuilderProps = {
  presets: SbtiTypeConfig[];
};

export function ShareCardBuilder({ presets }: ShareCardBuilderProps) {
  const firstPreset = presets[0] ?? {
    code: "SBTI",
    title: "Share Card",
    subtitle: "Editable result card",
    tagline: "Customize the fields and export a ready-to-post image.",
    footerText: "Built by the team behind sbtitest.co",
    ctaText: "Take the full test",
    emoji: ":)",
    theme: {
      background: "#101826",
      foreground: "#f8f4ec",
      accent: "#ff785a",
      accentSoft: "#20385f"
    }
  };
  const [selectedPreset, setSelectedPreset] = useState(firstPreset.code);
  const [card, setCard] = useState<EditableCardData>(createEditableCard(firstPreset));
  const [isExporting, setIsExporting] = useState(false);

  const applyPreset = (preset: SbtiTypeConfig) => {
    setSelectedPreset(preset.code);
    setCard(createEditableCard(preset));
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className="glass-panel rounded-[28px] border border-black/10 p-5 shadow-panel sm:p-6">
        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-black/45">
            Presets
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((preset) => {
              const active = preset.code === selectedPreset;
              return (
                <button
                  key={preset.code}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`rounded-full border px-3 py-2 text-sm transition ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-black/10 bg-white/80 text-ink hover:border-black/25"
                  }`}
                >
                  {preset.code}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Field label="Type code">
            <input
              value={card.code}
              onChange={(event) =>
                setCard((current) => ({ ...current, code: event.target.value }))
              }
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/25"
            />
          </Field>

          <Field label="Title">
            <input
              value={card.title}
              onChange={(event) =>
                setCard((current) => ({ ...current, title: event.target.value }))
              }
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/25"
            />
          </Field>

          <Field label="Subtitle">
            <input
              value={card.subtitle}
              onChange={(event) =>
                setCard((current) => ({
                  ...current,
                  subtitle: event.target.value
                }))
              }
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/25"
            />
          </Field>

          <Field label="Tagline">
            <textarea
              value={card.tagline}
              onChange={(event) =>
                setCard((current) => ({
                  ...current,
                  tagline: event.target.value
                }))
              }
              rows={3}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/25"
            />
          </Field>

          <Field label="Theme color">
            <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
              <input
                type="color"
                value={card.theme.accent}
                onChange={(event) =>
                  setCard((current) => ({
                    ...current,
                    theme: { ...current.theme, accent: event.target.value }
                  }))
                }
                className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent p-0"
              />
              <input
                value={card.theme.accent}
                onChange={(event) =>
                  setCard((current) => ({
                    ...current,
                    theme: { ...current.theme, accent: event.target.value }
                  }))
                }
                className="min-w-0 flex-1 border-0 bg-transparent outline-none"
              />
            </div>
          </Field>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="https://sbtitest.co"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-center text-sm font-medium text-ink transition hover:border-black/20 hover:bg-black/5"
          >
            Full Test
          </a>
          <button
            type="button"
            onClick={async () => {
              setIsExporting(true);
              try {
                await downloadCardPng(card);
              } finally {
                setIsExporting(false);
              }
            }}
            className="rounded-2xl bg-coral px-4 py-3 text-sm font-medium text-ink transition hover:brightness-95"
          >
            {isExporting ? "Exporting..." : "Export PNG"}
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-[32px] border border-black/10 p-4 shadow-panel sm:p-5 lg:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-black/45">
              Live preview
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-ink">
              1200x630 social share card
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-black/60">
            Built by the team behind sbtitest.co. Fork it, restyle it, or wire it
            into your own quiz flow.
          </p>
        </div>
        <ShareCardPreview card={card} />
      </div>
    </section>
  );
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-black/70">{label}</span>
      {children}
    </label>
  );
}
