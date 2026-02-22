import ServicesPage from "@/routes/ServicesPage";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const pageDescription =
  "Explore BeamOptics diagnostic and analytical product lines, including FTIR analyzers, RedCheck platforms, and lab screening solutions.";

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Diagnostic and analytical instrumentation",
  provider: {
    "@type": "Organization",
    name: "BeamOptics Scientific Pvt. Ltd.",
    url: SITE_URL,
  },
  name: "BeamOptics Services",
  description: pageDescription,
  areaServed: "IN",
  url: `${SITE_URL}/services`,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Diagnostic and analytical products",
    itemListElement: [
      { "@type": "ListItem", position: 1, item: { "@type": "Product", name: "RedCheck Hb Device" } },
      { "@type": "ListItem", position: 2, item: { "@type": "Product", name: "RedCheck HbA1c Device" } },
      { "@type": "ListItem", position: 3, item: { "@type": "Product", name: "FTIR Milk Analyzer" } },
      { "@type": "ListItem", position: 4, item: { "@type": "Product", name: "FTIR PG / Glycerine Analyzer" } },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
  ],
};

export const metadata = buildMetadata({
  title: "Services",
  description: pageDescription,
  path: "/services",
  keywords: ["FTIR analyzer", "HbA1c analyzer", "hemoglobin meter", "analytical instruments India"],
});

export default function Page() {
  const schemas = [servicesSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`services-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ServicesPage />
    </>
  );
}
