import { ShareCardBuilder } from "@/components/share-card-builder";
import {
  sbtiPresets,
  sbtiQuestionCount,
  sbtiResultCount
} from "@/lib/presets";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
      <header className="mb-8 flex flex-col gap-4 rounded-[28px] border border-black/10 bg-white/70 px-5 py-5 shadow-panel backdrop-blur sm:px-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full border border-black/10 bg-black px-3 py-1 text-xs uppercase tracking-[0.24em] text-white">
              SBTI Share Card Generator
            </p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
              Open-source share cards for absurd personality quiz results.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-black/70 sm:text-lg">
              Build screenshot-friendly result cards, tweak the personality copy,
              and export a 1200x630 image for social posts or OG previews.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <div className="flex items-center rounded-full border border-black/10 bg-white px-4 py-3 text-sm font-medium text-ink">
              {sbtiQuestionCount} questions / {sbtiResultCount} results
            </div>
            <a
              className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
              href="https://sbtitest.co"
              target="_blank"
              rel="noreferrer"
            >
              Take Full Test
            </a>
            <a
              className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-ink transition hover:border-black/20 hover:bg-black/5"
              href="https://sbtitest.co"
              target="_blank"
              rel="noreferrer"
            >
              Explore All Types
            </a>
          </div>
        </div>
        <p className="text-sm text-black/60">
          Take the full interactive test at{" "}
          <a
            className="font-medium text-ink underline decoration-coral decoration-2 underline-offset-4"
            href="https://sbtitest.co"
            target="_blank"
            rel="noreferrer"
          >
            sbtitest.co
          </a>
          . This repo focuses on the reusable share-card layer only.
        </p>
      </header>

      <ShareCardBuilder presets={sbtiPresets} />
    </main>
  );
}
