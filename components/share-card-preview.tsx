import { generateShareCardSvg, svgToDataUri, type EditableCardData } from "@/lib/share-card";

type ShareCardPreviewProps = {
  card: EditableCardData;
};

export function ShareCardPreview({ card }: ShareCardPreviewProps) {
  const svg = generateShareCardSvg(card);

  return (
    <div className="rounded-[28px] bg-[#fff8ee] p-3 shadow-[inset_0_0_0_1px_rgba(9,17,31,0.06)] sm:p-4">
      <div className="overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-2xl">
        <img
          src={svgToDataUri(svg)}
          alt={`${card.code} share card preview`}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}
