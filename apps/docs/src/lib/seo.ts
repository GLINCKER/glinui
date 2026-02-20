const FALLBACK_SITE_URL = "https://glinui.com";

function normalizeSiteUrl(value?: string) {
  if (!value) return FALLBACK_SITE_URL;
  const trimmed = value.trim();
  if (!trimmed) return FALLBACK_SITE_URL;
  return trimmed.replace(/\/+$/g, "");
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const SITE_NAME = "Glin UI";
export const SITE_DESCRIPTION =
  "Production-grade liquid glass UI components for React by GLINR STUDIO.";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image.png";

export function isLocalSiteUrl(url: string) {
  return /localhost|127\.0\.0\.1/.test(url);
}
