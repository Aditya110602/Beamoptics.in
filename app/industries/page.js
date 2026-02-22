import IndustriesPage from "@/routes/IndustriesPage";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const pageDescription =
  "See how BeamOptics supports dairy, food products, veterinary, pharmaceutical, and public-health workflows with precision diagnostics.";

const industriesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "BeamOptics Industries",
  url: `${SITE_URL}/industries`,
  description: pageDescription,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE_URL}/industries` },
  ],
};

export const metadata = buildMetadata({
  title: "Industries",
  description: pageDescription,
  path: "/industries",
  keywords: [
    "dairy quality testing",
    "food contamination screening",
    "veterinary diagnostics",
    "pharma impurity screening",
  ],
});

export default function Page() {
  const schemas = [industriesSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`industries-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <IndustriesPage />
    </>
  );
}
