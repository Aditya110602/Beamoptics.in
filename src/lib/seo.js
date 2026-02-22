const SITE_URL = "https://beamoptics.in";
const SITE_NAME = "BeamOptics";
const SITE_LEGAL_NAME = "BeamOptics Scientific Pvt. Ltd.";
const SITE_TITLE = `${SITE_LEGAL_NAME} | Precision Diagnostics and Analytical Instruments`;
const DEFAULT_DESCRIPTION =
  "BeamOptics Scientific Pvt. Ltd. develops precision FTIR and diagnostic instrumentation for healthcare, dairy quality, food safety, and pharmaceutical screening.";
const DEFAULT_KEYWORDS = [
  "BeamOptics",
  "Beam Optics",
  "precision diagnostics",
  "analytical instruments",
  "FTIR milk analyzer",
  "Hb meter",
  "HbA1c analyzer",
  "dairy quality testing",
  "pharmaceutical solvent screening",
];
const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";
const DEFAULT_TWITTER_IMAGE_PATH = "/twitter-image";

function normalizePath(path = "/") {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

function absoluteUrl(path = "/") {
  const normalizedPath = normalizePath(path);
  return `${SITE_URL}${normalizedPath}`;
}

function fullTitle(title) {
  if (!title) return SITE_TITLE;
  return `${title} | ${SITE_NAME}`;
}

function mergeKeywords(customKeywords = []) {
  return Array.from(new Set([...DEFAULT_KEYWORDS, ...customKeywords]));
}

function buildMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  noIndex = false,
} = {}) {
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const canonicalPath = normalizePath(path);
  const canonicalUrl = absoluteUrl(canonicalPath);
  const socialTitle = fullTitle(title);

  return {
    ...(title ? { title } : {}),
    description: metaDescription,
    keywords: mergeKeywords(keywords),
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type,
      url: canonicalUrl,
      title: socialTitle,
      description: metaDescription,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: metaDescription,
      images: [absoluteUrl(DEFAULT_TWITTER_IMAGE_PATH)],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  SITE_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_TWITTER_IMAGE_PATH,
  absoluteUrl,
  buildMetadata,
  fullTitle,
};
