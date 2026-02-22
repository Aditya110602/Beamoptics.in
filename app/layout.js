import "../src/index.css";
import SiteFrame from "@/components/SiteFrame";
import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  SITE_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_TWITTER_IMAGE_PATH,
  absoluteUrl,
} from "@/lib/seo";

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || "";
const bingSiteVerification =
  process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || process.env.BING_SITE_VERIFICATION || "";

const metadataVerification = {
  ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
  ...(bingSiteVerification ? { other: { "msvalidate.01": bingSiteVerification } } : {}),
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_LEGAL_NAME,
  publisher: SITE_LEGAL_NAME,
  authors: [{ name: SITE_LEGAL_NAME }],
  keywords: DEFAULT_KEYWORDS,
  category: "Healthcare and analytical instrumentation",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_IN",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(DEFAULT_TWITTER_IMAGE_PATH)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/logo192.png",
  },
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  ...(Object.keys(metadataVerification).length
    ? { verification: metadataVerification }
    : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b5d95",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_LEGAL_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/Logo.png`,
  email: "info@beamoptics.in",
  telephone: "+91-9975568458",
  sameAs: ["https://www.linkedin.com/company/beamoptics-scientific-pvt-ltd/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: ["Beam Optics", SITE_LEGAL_NAME],
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: SITE_LEGAL_NAME,
  },
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Home", url: `${SITE_URL}/` },
    { "@type": "SiteNavigationElement", position: 2, name: "About Us", url: `${SITE_URL}/about` },
    { "@type": "SiteNavigationElement", position: 3, name: "Services", url: `${SITE_URL}/services` },
    { "@type": "SiteNavigationElement", position: 4, name: "Industries", url: `${SITE_URL}/industries` },
    { "@type": "SiteNavigationElement", position: 5, name: "Contact Us", url: `${SITE_URL}/contact` },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="icon" href="/Logo.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
