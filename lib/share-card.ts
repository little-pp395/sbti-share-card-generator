export type SbtiTypeConfig = {
  code: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  description?: string;
  footerText?: string;
  ctaText?: string;
  emoji?: string;
  theme: {
    background: string;
    foreground: string;
    accent: string;
    accentSoft: string;
  };
};

export type EditableCardData = SbtiTypeConfig;

export const CARD_WIDTH = 1200;
export const CARD_HEIGHT = 630;

export function createEditableCard(preset: SbtiTypeConfig): EditableCardData {
  return {
    ...preset,
    theme: { ...preset.theme }
  };
}

export function generateShareCardSvg(card: EditableCardData) {
  const subtitle = card.subtitle || "Chaotic good problem-solver";
  const tagline =
    card.tagline || "Thrives on bold ideas, overbuilt side quests, and accidental virality.";
  const footer = card.footerText || "Built by the team behind sbtitest.co";
  const cta = card.ctaText || "Take the full test";
  const emoji = card.emoji || "??";
  const accent = normalizeHex(card.theme.accent);
  const background = card.theme.background;
  const foreground = card.theme.foreground;
  const accentSoft = card.theme.accentSoft;

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}" fill="none">
  <defs>
    <linearGradient id="panel" x1="120" y1="60" x2="1040" y2="590" gradientUnits="userSpaceOnUse">
      <stop stop-color="${background}" />
      <stop offset="1" stop-color="${accentSoft}" />
    </linearGradient>
    <radialGradient id="flare" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1020 112) rotate(118.469) scale(330 412)">
      <stop stop-color="${accent}" stop-opacity="0.36" />
      <stop offset="1" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="${withOpacity(foreground, 0.08)}" />
    </pattern>
    <filter id="shadow" x="0" y="0" width="1200" height="630" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="${withOpacity("#09111f", 0.14)}" />
    </filter>
  </defs>

  <rect width="1200" height="630" rx="36" fill="#F8F1E4" />
  <g filter="url(#shadow)">
    <rect x="42" y="42" width="1116" height="546" rx="34" fill="url(#panel)" />
  </g>
  <rect x="42" y="42" width="1116" height="546" rx="34" fill="url(#flare)" />
  <rect x="42" y="42" width="1116" height="546" rx="34" fill="url(#dots)" />

  <rect x="92" y="86" width="140" height="140" rx="32" fill="${withOpacity(accent, 0.18)}" stroke="${withOpacity(foreground, 0.08)}" />
  <text x="162" y="177" text-anchor="middle" font-size="74" font-family="Arial, sans-serif">${escapeXml(emoji)}</text>

  <rect x="272" y="96" width="278" height="44" rx="22" fill="${foreground}" />
  <text x="411" y="125" text-anchor="middle" font-size="20" font-family="'IBM Plex Mono', 'Courier New', monospace" letter-spacing="4" fill="${background}">
    ${escapeXml(card.code.toUpperCase())}
  </text>

  <text x="92" y="310" font-size="76" font-weight="700" font-family="'Space Grotesk', Arial, sans-serif" fill="${foreground}">
    ${escapeXml(limitText(card.title, 26))}
  </text>
  <text x="92" y="356" font-size="28" font-family="'IBM Plex Mono', 'Courier New', monospace" fill="${withOpacity(foreground, 0.78)}">
    ${escapeXml(limitText(subtitle, 52))}
  </text>

  ${renderWrappedText({
    text: tagline,
    x: 92,
    y: 430,
    maxCharsPerLine: 42,
    lineHeight: 42,
    fontSize: 32,
    color: withOpacity(foreground, 0.92)
  })}

  <rect x="822" y="118" width="252" height="252" rx="36" fill="${withOpacity("#ffffff", 0.56)}" />
  <rect x="850" y="146" width="196" height="18" rx="9" fill="${withOpacity(foreground, 0.11)}" />
  <rect x="850" y="184" width="158" height="18" rx="9" fill="${withOpacity(foreground, 0.11)}" />
  <rect x="850" y="234" width="122" height="122" rx="24" fill="${accent}" />
  <path d="M903 270C903 252.327 917.327 238 935 238H965C982.673 238 997 252.327 997 270V310C997 327.673 982.673 342 965 342H935C917.327 342 903 327.673 903 310V270Z" fill="${withOpacity("#ffffff", 0.82)}"/>
  <path d="M922 289H978" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  <path d="M950 261V317" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>

  <rect x="92" y="500" width="290" height="56" rx="28" fill="${accent}" />
  <text x="237" y="536" text-anchor="middle" font-size="24" font-weight="700" font-family="'Space Grotesk', Arial, sans-serif" fill="#09111f">
    ${escapeXml(limitText(cta, 22))}
  </text>

  <text x="92" y="586" font-size="22" font-family="'IBM Plex Mono', 'Courier New', monospace" fill="${withOpacity(foreground, 0.72)}">
    ${escapeXml(limitText(footer, 58))}
  </text>
</svg>`.trim();
}

export function svgToDataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export async function downloadCardPng(card: EditableCardData) {
  const svg = generateShareCardSvg(card);
  const img = new Image();
  img.decoding = "async";

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load generated SVG"));
    img.src = svgToDataUri(svg);
  });

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas context is unavailable");
  }

  context.drawImage(img, 0, 0, CARD_WIDTH, CARD_HEIGHT);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png")
  );

  if (!blob) {
    throw new Error("PNG export failed");
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${card.code.toLowerCase().replace(/\s+/g, "-") || "sbti-card"}.png`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function limitText(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function normalizeHex(value: string) {
  const trimmed = value.trim();
  return /^#[0-9a-fA-F]{6}$/.test(trimmed) ? trimmed : "#ff785a";
}

function withOpacity(hex: string, opacity: number) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return hex;
  }

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function renderWrappedText({
  text,
  x,
  y,
  maxCharsPerLine,
  lineHeight,
  fontSize,
  color
}: {
  text: string;
  x: number;
  y: number;
  maxCharsPerLine: number;
  lineHeight: number;
  fontSize: number;
  color: string;
}) {
  const lines = wrapText(text, maxCharsPerLine).slice(0, 3);

  return lines
    .map(
      (line, index) => `
  <text x="${x}" y="${y + index * lineHeight}" font-size="${fontSize}" font-family="'Space Grotesk', Arial, sans-serif" fill="${color}">
    ${escapeXml(line)}
  </text>`
    )
    .join("");
}

function wrapText(text: string, maxCharsPerLine: number) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}
