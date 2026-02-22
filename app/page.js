import Home from "@/routes/Home";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const pageDescription =
  "BeamOptics develops field-ready diagnostics and analytical systems for healthcare, dairy, food safety, and industrial quality workflows.";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "BeamOptics Home",
  url: `${SITE_URL}/`,
  description: pageDescription,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }],
};

export const metadata = buildMetadata({
  description: pageDescription,
  path: "/",
  keywords: [
    "field-ready diagnostics",
    "healthcare diagnostics India",
    "food safety analytics",
    "industrial quality testing",
  ],
});

export default function Page() {
  const schemas = [homeSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`home-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Home />
    </>
  );
}
