import AboutPage from "@/routes/AboutPage";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const pageDescription =
  "Learn about BeamOptics Scientific Pvt. Ltd., our precision optics expertise, diagnostics roadmap, and mission for accessible analytical science.";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About BeamOptics",
  url: `${SITE_URL}/about`,
  description: pageDescription,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "About Us", item: `${SITE_URL}/about` },
  ],
};

export const metadata = buildMetadata({
  title: "About BeamOptics",
  description: pageDescription,
  path: "/about",
  keywords: ["about BeamOptics", "precision optics company", "diagnostic innovation India"],
});

export default function Page() {
  const schemas = [aboutSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`about-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AboutPage />
    </>
  );
}
